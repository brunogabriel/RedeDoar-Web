import '../../src/database'
import { AdminUser } from '../../src/models'

const data = {
  name: process.argv[2],
  email: process.argv[3],
  username: process.argv[4],
  password: process.argv[5]
}

AdminUser.createUser(data).then((admin_user) => {
  if (admin_user) {
    console.log("- Usuário criado com sucesso!")
  } else {
    console.log("- Não foi possível criar usuário")
  }
  process.exit()
})
