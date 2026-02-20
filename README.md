# React Native (2h)

## APIs a serem consumidas
* **Login**

POST
https://dummyjson.com/auth/login

Exemplo:
```
{
  "username": "emilys",
  "password": "emilyspass"
}
```

Retorno:
interface LoginResponse -> src/types/index.ts


* **Usuário autenticado**

GET
https://dummyjson.com/auth/me

Header:
```
Authorization: Bearer <accessToken>
```

Retorno:
interface MeResponse -> src/types/index.ts


* **Produtos**

GET
https://dummyjson.com/products

Retorno:
interface ProductsResponse -> src/types/index.ts

