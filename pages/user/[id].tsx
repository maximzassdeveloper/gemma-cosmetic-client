import { NextPage } from 'next'
import { Container, Main } from '../../components/hoc'
import { PersonalAreaForm, OrderList } from '../../components'
import { useTypesSelector } from '../../hooks/useTypedSelector'

const PersonalAreaPage: NextPage = () => {

  const { user } = useTypesSelector(state => state.user)

  return (
    <Main authRequierd title={`Аккаунт Пользователя`}>
      <Container>
        <div className="personal-area page">
          <h1>{`Привет, ${user.fullName}!`}</h1>
          
          <div className="personal-area__content">
            <PersonalAreaForm />
            <OrderList />
          </div>

        </div>
      </Container>
    </Main>
  )
}

export default PersonalAreaPage