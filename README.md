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


## Docker

O projeto usa **Node 20** e pode ser executado via Docker.

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados.

### Primeira vez (ou em outro computador)

O arquivo `.env` não vai no Git (cada máquina tem um IP diferente). Quem clonar o projeto deve:

1. **Criar o `.env`** na raiz (copie o `.env.example`):
   - Windows: `copy .env.example .env`
   - Linux/Mac: `cp .env.example .env`
2. **Descobrir o IP da Wi-Fi** nessa máquina:
   - PowerShell na raiz do projeto: `.\scripts\get-host-ip.ps1`
   - Ou `ipconfig` → anotar o “Endereço IPv4” do adaptador **Wi-Fi**
3. **Editar o `.env`** e colocar esse IP: `HOST_IP=192.168.x.x`
4. Depois: `docker compose up --build` (e, para testar no celular, mesmo Wi-Fi + Expo Go + QR code).

### Desenvolvimento

- **Só web (navegador):** na raiz do projeto:
  ```bash
  docker compose up --build
  ```
  Depois abra `http://localhost:8081` (ou o link que o Expo mostrar).

- **Expo Go no celular (sem ngrok):**
  1. **IP correto:** não use `172.20.32.1` (é Docker/WSL; o celular não alcança). Use o IP do **adaptador Wi-Fi** (geralmente `192.168.x.x`). No PowerShell, na raiz do projeto: `.\scripts\get-host-ip.ps1` ou use `ipconfig` e pegue o “Endereço IPv4” da **Wi-Fi**.
  2. Na raiz do projeto, crie/edite `.env` com: `HOST_IP=192.168.x.x` (o IP da Wi-Fi).
  3. **Firewall (Windows):** se o celular não carregar, libere a porta 8081: Painel de Controle → Sistema e Segurança → Firewall do Windows → Configurações avançadas → Regras de entrada → Nova regra → Porta → TCP 8081 → Permitir.
  4. Suba o app: `docker compose up --build`. Celular na **mesma rede Wi-Fi** → Expo Go → escaneie o QR code.
  - Alternativa com tunnel (ngrok): `docker compose run --rm --service-ports app npm run start:tunnel` (pode falhar em redes que bloqueiam ngrok).

### Comandos úteis

| Comando | Descrição |
|--------|-----------|
| `docker compose up --build` | Sobe o app (Expo) com build da imagem |
| `docker compose run --rm app npm run web` | Roda apenas o target web |
| `docker compose run --rm --service-ports app npm run start:tunnel` | Expo com ngrok (tunnel); use `.env` + `HOST_IP` para LAN sem ngrok |

### Arquivos

- `Dockerfile` – imagem Node 20 Alpine, instala deps e inicia o Expo.
- `docker-compose.yml` – serviço `app` com portas 8081 e 19000–19002 e volume para live reload.
- `.dockerignore` – reduz contexto de build e tamanho da imagem.

