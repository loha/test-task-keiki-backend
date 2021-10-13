import { RouteStatusesMigration } from './routeStatuses';
import { CitiesMigration } from './cities';
import { TransportTypesMigration } from './transportTypes';
import { TransportsMigration } from './transports';
import { RoutesMigration } from './routes';

const migrations = [
  RouteStatusesMigration,
  CitiesMigration,
  TransportTypesMigration,
  TransportsMigration,
  RoutesMigration,
];

async function migrate() {
  for (const Migration of migrations) {
    const migration = new Migration();
    const name = migration.tableName;
    const result = await migration.migrate();

    console.log(`Migration table - ${name} - Status - ${result}`);
  }
}

export { migrate };
