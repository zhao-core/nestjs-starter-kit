import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { redisStore } from 'cache-manager-redis-store';
import { CacheConfigService } from './cache-config.service';

jest.mock('cache-manager-redis-store', () => ({
  redisStore: jest.fn(),
}));

describe('CacheConfigService', () => {
  let service: CacheConfigService;

  beforeEach(async () => {
    const mockData = {
      host: 'host',
      port: 0,
      password: 'password',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(mockData),
          },
        },
      ],
    }).compile();

    service = module.get<CacheConfigService>(CacheConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return redis config', async () => {
    const cacheOptions = service.createCacheOptions();
    const redisMock = jest.mocked(redisStore);
    const mockData = {
      socket: {
        host: 'host',
        port: 0,
      },
      password: 'password',
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await cacheOptions.store();

    expect(cacheOptions.ttl).toBe(60 * 60);

    expect(redisMock).toHaveBeenCalledWith(mockData);
  });
});
