import fs from "fs";
import path from "path";

const moduleName = process.argv[2];
if (!moduleName) {
  console.error("Informe o nome do módulo: node scripts/generate-module.js <nome>");
  process.exit(1);
}

const baseDir = path.join(__dirname, "..", "src", "modules", moduleName);
if (fs.existsSync(baseDir)) {
  console.error("Módulo já existe!");
  process.exit(1);
}

// fs.mkdirSync(baseDir, { recursive: true });

const className = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);

const controller = `
import { Request, Response } from 'express';
import { ${className}Service } from './${moduleName}.service';

const service = new ${className}Service();

export class ${className}Controller {
  async list(req: Request, res: Response) {
    const data = await service.findAll();
    res.json(data);
  }
}
`;

const service = `
import { ${className}Repository } from './${moduleName}.repository';

export class ${className}Service {
  private repo = new ${className}Repository();
  async findAll() {
    return this.repo.findAll();
  }
}
`;

const repository = `
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ${className}Repository {
  async findAll() {
    return prisma.${moduleName}.findMany();
  }
}
`;

// fs.writeFileSync(path.join(baseDir, `${moduleName}.controller.ts`), controller.trim());
// fs.writeFileSync(path.join(baseDir, `${moduleName}.service.ts`), service.trim());
// fs.writeFileSync(path.join(baseDir, `${moduleName}.repository.ts`), repository.trim());

console.log(`Módulo '${moduleName}' criado com sucesso!`);
