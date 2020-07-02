# warren-api-test
A API foi desenvolvida com Node.js e Typescript.<br/>
O banco de dados utilizado durante o desenvolvimento foi MySQL.<br/>
Abaixo tem instruções para a instalação do projeto.<br/>
Na raiz do projeto também há um diretório <strong>documentation</strong> com um arquivo de documentação (Documentacao_warren_api_test.pdf) com mais informações sobre a arquitetura do projeto. 


## Instalação:
- Fazer o clone do projeto;
- Instalar as dependências do projeto;
```
npm install
```
- Alterar as credenciais do banco de dados do arquivo <strong>.env</strong> na raiz do projeto;
- Baixar as dependências do projeto;
- Criar as tabelas no banco de dados com o comando abaixo;
```
npm run migrate
```
- Iniciar o projeto com o comando abaixo;
```
npm run start
```

## Prinicipais tecnologias utilizadas:
- Node.js (https://nodejs.org/)
- Typescript (https://www.typescriptlang.org/)
- Sequelize (https://sequelize.org/)
- Sequelize-typescript (https://github.com/RobinBuschmann/sequelize-typescript)
- Awilix (https://github.com/jeffijoe/awilix)

### Outras usadas apenas na página front-end para testar a API:
- Axios (https://github.com/axios/axios) 
- Vue.js (https://vuejs.org/)