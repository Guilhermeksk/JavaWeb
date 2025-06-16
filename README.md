# 💳 Gerenciador de Cartões

Sistema CRUD completo para cadastro, atualização, remoção e listagem de cartões de crédito. Desenvolvido em **Java + Spring Boot**, utilizando **SQL Server** como banco de dados e interface web feita em **HTML + Tailwind CSS + JavaScript**.

---

## 🚀 Tecnologias Utilizadas

- 💻 **Java 17**
- 🌱 **Spring Boot 3**
- 🗄️ **SQL Server (JDBC)**
- 🔗 **Spring JDBC Template**
- 🎨 **HTML + TailwindCSS**
- 🧠 **Lombok**
- 🔧 **Maven**
- 🧠 **IntelliJ / VSCode**


---

## 🎯 Funcionalidades

- ✅ **Cadastrar Cartões**
- 🔄 **Atualizar Cartões**
- 📄 **Listar todos os Cartões ativos**
- ❌ **Excluir Cartões**
- 🌐 Interface Web estilizada com Tailwind CSS
- 🔗 Conexão ao banco de dados SQL Server via Spring JDBC

---

## ⚙️ Como rodar o projeto

1️⃣ Clone o repositório:
```bash
git clone https://github.com/Guilhermeksk//JavaWeb.git]
```
2️⃣ Configure o application.properties:
```bash
spring.datasource.url=jdbc:sqlserver://SEU_SERVIDOR;databaseName=NOME_DO_BANCO;encrypt=false
spring.datasource.username=SEU_USER
spring.datasource.password=SUA_SENHA
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
3️⃣ Crie essa estrutura em seu sql server
```bash
CREATE TABLE Cartao (
    id_card INT PRIMARY KEY IDENTITY(1,1),
    nome_card VARCHAR(100),
    numero VARCHAR(20),
    tipo VARCHAR(50),
    cvv INT,
    status INT
);
```
4️⃣  Acesse no navegador:
```bash
http://localhost:9000
```
