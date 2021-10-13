import { Command } from 'commander';
import { migrate } from '~/database/migrations';
import { fill } from '~/database/seeders';
require('dotenv').config();

const program = new Command();

program.command('db:migrate').action(async () => {
  console.log('Migrations started...');
  await migrate();
  console.log('Migrations completed.');
});

program.command('db:seed').action(async () => {
  console.log('Seeders started...');
  await fill();
  console.log('Seeders completed.');
});

program.parse();
