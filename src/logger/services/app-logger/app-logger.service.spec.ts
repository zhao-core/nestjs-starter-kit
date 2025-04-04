import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { pino } from 'pino';
import { ASYNC_STORAGE } from '../../../base/constants';
import { AppLoggerService } from './app-logger.service';

jest.mock('pino', () => ({
  pino: jest.fn(),
}));

describe('AppLoggerService', () => {
  const setUpModule = async (): Promise<TestingModule> => {
    const storeMap = new Map();
    storeMap.set('traceId', 'uuid');

    return await Test.createTestingModule({
      providers: [
        AppLoggerService,
        {
          provide: ASYNC_STORAGE,
          useValue: {
            getStore: jest.fn().mockReturnValue(storeMap),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('debug'),
          },
        },
      ],
    }).compile();
  };

  it('should be defined', async () => {
    const pinoMock = jest.mocked(pino);
    const module = await setUpModule();
    const service = module.get<AppLoggerService>(AppLoggerService);

    expect(service).toBeDefined();
    expect(pinoMock).toHaveBeenCalledWith({
      level: 'debug',
      transport: {
        target: 'pino-pretty',
      },
    });
  });

  it('should define error logger', async () => {
    const pinoMock = jest.mocked(pino);
    const errorMock = jest.fn();
    pinoMock.mockReturnValueOnce({
      error: errorMock,
    } as unknown as pino.Logger<string>);

    const module = await setUpModule();
    const service = module.get<AppLoggerService>(AppLoggerService);

    service.error('message', 'trace', 'context');

    expect(errorMock).toHaveBeenCalledWith(
      { traceId: 'uuid' },
      '[context] message',
    );
    expect(errorMock).toHaveBeenCalledWith('trace');
  });

  it('should define info logger', async () => {
    const pinoMock = jest.mocked(pino);
    const logMock = jest.fn();
    pinoMock.mockReturnValueOnce({
      info: logMock,
    } as unknown as pino.Logger<string>);

    const module = await setUpModule();
    const service = module.get<AppLoggerService>(AppLoggerService);

    service.info('message', 'context');

    expect(logMock).toHaveBeenCalledWith(
      { traceId: 'uuid' },
      '[context] message',
    );
  });

  it('should define warn logger', async () => {
    const pinoMock = jest.mocked(pino);
    const logMock = jest.fn();
    pinoMock.mockReturnValueOnce({
      warn: logMock,
    } as unknown as pino.Logger<string>);

    const module = await setUpModule();
    const service = module.get<AppLoggerService>(AppLoggerService);

    service.warn('message', 'context');

    expect(logMock).toHaveBeenCalledWith(
      { traceId: 'uuid' },
      '[context] message',
    );
  });

  it('should define debug logger', async () => {
    const pinoMock = jest.mocked(pino);
    const logMock = jest.fn();
    pinoMock.mockReturnValueOnce({
      debug: logMock,
    } as unknown as pino.Logger<string>);

    const module = await setUpModule();
    const service = module.get<AppLoggerService>(AppLoggerService);

    service.debug('message', 'context');

    expect(logMock).toHaveBeenCalledWith(
      { traceId: 'uuid' },
      '[context] message',
    );
  });
});
