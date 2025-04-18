import { container } from 'tsyringe'
import { LocalStorageProvider } from './implementations/local-storage-provider'
import { S3AwsStorageProvider } from './implementations/s3-aws-storage-provider'
import { S3DigitalOceanStorageProvider } from './implementations/s3-digital-ocean-storage-provider'
import { IStorageProvider } from './i-storage-provider'

const diskStorage = {
  local: LocalStorageProvider,
  s3Aws: S3AwsStorageProvider,
  s3DigitalOcean: S3DigitalOceanStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
)
