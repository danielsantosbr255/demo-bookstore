# Database Client - Padrão Similar ao Prisma ORM

Este sistema implementa um padrão similar ao Prisma ORM, onde você pode acessar todos os models através de uma instância central do database client.

## Como Usar

### Importação

```javascript
import db from '@/config/database/client.js';
```

### Operações Disponíveis

#### 1. Criar registros

```javascript
// Criar usuário
const usuario = await db.user.create({
  data: {
    name: 'João Silva',
    email: 'joao@email.com',
    password: 'senha123',
  },
});

// Criar categoria
const categoria = await db.category.create({
  data: {
    name: 'Livros',
    slug: 'livros',
  },
});
```

#### 2. Buscar registros

```javascript
// Buscar todos os usuários
const usuarios = await db.user.findMany();

// Buscar com filtros
const usuariosFiltrados = await db.user.findMany({
  where: { name: 'João' },
});

// Buscar um único registro
const usuario = await db.user.findUnique({ where: { id: 1 } });
const usuarioPorEmail = await db.user.findUnique({ where: { email: 'joao@email.com' } });
```

#### 3. Atualizar registros

```javascript
const usuarioAtualizado = await db.user.update({
  where: { id: 1 },
  data: { name: 'João Silva Santos' },
});
```

#### 4. Deletar registros

```javascript
const usuarioDeletado = await db.user.delete({ where: { id: 1 } });
```

## Models Disponíveis

- `db.user` - Operações com usuários
- `db.product` - Operações com produtos
- `db.brand` - Operações com marcas
- `db.category` - Operações com categorias

## Sincronização de Tabelas

Para sincronizar todas as tabelas do banco de dados:

```javascript
import db from '@/config/database/client.js';

await db.sync();
```

## Exemplo Completo

```javascript
import db from '@/config/database/client.js';

async function exemplo() {
  // Criar categoria
  const categoria = await db.category.create({
    data: { name: 'Livros', slug: 'livros' },
  });

  // Criar marca
  const marca = await db.brand.create({
    data: { name: 'Editora ABC', slug: 'editora-abc' },
  });

  // Criar produto
  const produto = await db.product.create({
    data: {
      title: 'Livro de Programação',
      description: 'Um livro sobre programação',
      price: 49.9,
      slug: 'livro-programacao',
      brandId: marca.id,
      categoryId: categoria.id,
    },
  });

  console.log('Produto criado:', produto);
}
```

## Vantagens

1. **Sintaxe similar ao Prisma**: Fácil migração e familiaridade
2. **Centralizado**: Todos os models em uma única instância
3. **Type-safe**: Suporte a TypeScript com interfaces definidas
4. **Flexível**: Fácil adição de novos models
5. **Consistente**: Padrão uniforme para todas as operações
