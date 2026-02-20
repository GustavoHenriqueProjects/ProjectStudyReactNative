# React Native (2h)

## Início
- Abra o link do projeto base: https://snack.expo.dev/@rafaelspereira/processoseletivobase.
- Faça login no Snack.
- Faça uma pequena alteração e clique em Save.
- Confirme que a URL mudou para o seu usuário.
- Trabalhe na sua cópia.



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


## Entrega
Salvar e enviar o link da sua versão e o arquivo zip.

