import { CitiesSeeder } from './cities';
import { RouteStatusesSeeder } from './routeStatuses';
import { TransportTypesSeeder } from './transportTypes';
import { TransportsSeeder } from './transports';
import { RoutesSeeder } from './routes';

const seeders = [CitiesSeeder, RouteStatusesSeeder, TransportTypesSeeder, TransportsSeeder, RoutesSeeder];

async function fill() {
  for (const Seeder of seeders) {
    const seeder = new Seeder();
    const name = seeder.tableName;
    const result = await seeder.fill();

    console.log(`Seeder table - ${name} - Status - ${result}`);
  }
}

export { fill };
