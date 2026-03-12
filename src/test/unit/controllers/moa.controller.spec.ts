import { INestApplication } from "@nestjs/common";
import { mockMoaEconomicsService, mockMoaFarmsService, mockMoaPairService, mockMoaSettingsService, mockMoaTokensService } from "./services.mock/moa.services.mock";
import { Test, TestingModule } from "@nestjs/testing";
import { MoaController } from "src/endpoints/moa/moa.controller";
import { MoaSettingsService } from "src/endpoints/moa/moa.settings.service";
import { MoaEconomicsService } from "src/endpoints/moa/moa.economics.service";
import { MoaPairService } from "src/endpoints/moa/moa.pair.service";
import { MoaTokenService } from "src/endpoints/moa/moa.token.service";
import { MoaFarmService } from "src/endpoints/moa/moa.farm.service";
import request = require('supertest');
import { PublicAppModule } from "src/public.app.module";
import { QueryPagination } from "src/common/entities/query.pagination";
import { MoaPairExchange } from "src/endpoints/moa/entities/moa.pair.exchange";
import { MoaPairsFilter } from 'src/endpoints/moa/entities/moa.pairs..filter';

describe('MoaController', () => {
  let app: INestApplication;
  const path = '/moa';

  const moaSettingsServiceMocks = mockMoaSettingsService();
  const moaEconomicsServiceMocks = mockMoaEconomicsService();
  const moaPairServiceMocks = mockMoaPairService();
  const moaTokensServiceMocks = mockMoaTokensService();
  const moaFarmsServiceMocks = mockMoaFarmsService();

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MoaController],
      imports: [PublicAppModule],
    }).overrideProvider(MoaSettingsService).useValue(moaSettingsServiceMocks)
      .overrideProvider(MoaEconomicsService).useValue(moaEconomicsServiceMocks)
      .overrideProvider(MoaPairService).useValue(moaPairServiceMocks)
      .overrideProvider(MoaTokenService).useValue(moaTokensServiceMocks)
      .overrideProvider(MoaFarmService).useValue(moaFarmsServiceMocks)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /moa/setting', () => {
    it('should return moa settings details', async () => {
      moaSettingsServiceMocks.getSettings.mockReturnValue({});
      await request(app.getHttpServer())
        .get(`${path}/settings`)
        .expect(200);

      expect(moaSettingsServiceMocks.getSettings).toHaveBeenCalled();
    });
  });

  describe('GET /moa/economics', () => {
    it('should return moa economics details', async () => {
      moaEconomicsServiceMocks.getMoaEconomics.mockReturnValue({});
      await request(app.getHttpServer())
        .get(`${path}/economics`)
        .expect(200);

      expect(moaEconomicsServiceMocks.getMoaEconomics).toHaveBeenCalled();
    });
  });

  describe('GET /moa/pairs', () => {
    it('should return a list of moa pairs', async () => {
      moaPairServiceMocks.getMoaPairs.mockReturnValue([]);
      await request(app.getHttpServer())
        .get(`${path}/pairs`)
        .expect(200);

      expect(moaPairServiceMocks.getMoaPairs).toHaveBeenCalledWith(
        0, 25, new MoaPairsFilter({ exchange: undefined, includeFarms: false })
      );
    });

    it('should return a list of moa pairs with size equal with 5', async () => {
      moaPairServiceMocks.getMoaPairs.mockReturnValue([]);
      const queryPagination = new QueryPagination({ from: 0, size: 5 });

      await request(app.getHttpServer())
        .get(`${path}/pairs?size=${queryPagination.size}`)
        .expect(200);

      expect(moaPairServiceMocks.getMoaPairs).toHaveBeenCalledWith(
        0, 5, new MoaPairsFilter({ exchange: undefined, includeFarms: false })
      );
    });

    it('should return a list of moa pairs from exchange source', async () => {
      moaPairServiceMocks.getMoaPairs.mockReturnValue([]);
      const queryPagination = new QueryPagination({ from: 0, size: 5 });

      await request(app.getHttpServer())
        .get(`${path}/pairs?size=${queryPagination.size}&exchange=${MoaPairExchange.dharitrix}`)
        .expect(200);

      expect(moaPairServiceMocks.getMoaPairs).toHaveBeenCalledWith(
        0, 5, new MoaPairsFilter({ exchange: MoaPairExchange.dharitrix, includeFarms: false })
      );
    });

    it('should return a list of moa pairs from unknown source', async () => {
      moaPairServiceMocks.getMoaPairs.mockReturnValue([]);
      const queryPagination = new QueryPagination({ from: 0, size: 5 });

      await request(app.getHttpServer())
        .get(`${path}/pairs?size=${queryPagination.size}&exchange=${MoaPairExchange.unknown}`)
        .expect(200);

      expect(moaPairServiceMocks.getMoaPairs).toHaveBeenCalledWith(
        0, 5, new MoaPairsFilter({ exchange: MoaPairExchange.unknown, includeFarms: false })
      );
    });

    it('should return total moa pairs count', async () => {
      moaPairServiceMocks.getMoaPairsCount.mockReturnValue(10);
      await request(app.getHttpServer())
        .get(`${path}/pairs/count`)
        .expect(200)
        .expect(response => {
          expect(+response.text).toStrictEqual(10);
        });

      expect(moaPairServiceMocks.getMoaPairsCount).toHaveBeenCalledWith(
        new MoaPairsFilter({ exchange: undefined, includeFarms: false })
      );
    });

    it('should return total moa pairs count from exchange', async () => {
      moaPairServiceMocks.getMoaPairsCount.mockReturnValue(5);
      await request(app.getHttpServer())
        .get(`${path}/pairs/count?exchange=${MoaPairExchange.dharitrix}`)
        .expect(200)
        .expect(response => {
          expect(+response.text).toStrictEqual(5);
        });

      expect(moaPairServiceMocks.getMoaPairsCount).toHaveBeenCalledWith(
        new MoaPairsFilter({ exchange: MoaPairExchange.dharitrix, includeFarms: false })
      );
    });

    it('should return total moa pairs count from unknown', async () => {
      moaPairServiceMocks.getMoaPairsCount.mockReturnValue(5);
      await request(app.getHttpServer())
        .get(`${path}/pairs/count?exchange=${MoaPairExchange.unknown}`)
        .expect(200)
        .expect(response => {
          expect(+response.text).toStrictEqual(5);
        });

      expect(moaPairServiceMocks.getMoaPairsCount).toHaveBeenCalledWith(
        new MoaPairsFilter({ exchange: MoaPairExchange.unknown, includeFarms: false })
      );
    });

    it('should return moa pair based on basId and quoteId', async () => {
      moaPairServiceMocks.getMoaPair.mockReturnValue({});
      const baseId = 'MOA-455c57';
      const quoteId = 'WREWA-bd4d79';

      await request(app.getHttpServer())
        .get(`${path}/pairs/${baseId}/${quoteId}`)
        .expect(200);

      expect(moaPairServiceMocks.getMoaPair).toHaveBeenCalledWith(baseId, quoteId, false);
    });

    it('should return moa pairs with farms information', async () => {
      moaPairServiceMocks.getMoaPairs.mockReturnValue([]);
      await request(app.getHttpServer())
        .get(`${path}/pairs?includeFarms=true`)
        .expect(200);

      expect(moaPairServiceMocks.getMoaPairs).toHaveBeenCalledWith(
        0, 25, new MoaPairsFilter({ exchange: undefined, includeFarms: true })
      );
    });

    it('should return moa pair with farms information', async () => {
      moaPairServiceMocks.getMoaPair.mockReturnValue({});
      const baseId = 'MOA-455c57';
      const quoteId = 'WREWA-bd4d79';

      await request(app.getHttpServer())
        .get(`${path}/pairs/${baseId}/${quoteId}?includeFarms=true`)
        .expect(200);

      expect(moaPairServiceMocks.getMoaPair).toHaveBeenCalledWith(baseId, quoteId, true);
    });

    it('should return total moa pairs count with farms information', async () => {
      moaPairServiceMocks.getMoaPairsCount.mockReturnValue(10);
      await request(app.getHttpServer())
        .get(`${path}/pairs/count?includeFarms=true`)
        .expect(200)
        .expect(response => {
          expect(+response.text).toStrictEqual(10);
        });

      expect(moaPairServiceMocks.getMoaPairsCount).toHaveBeenCalledWith(
        new MoaPairsFilter({ exchange: undefined, includeFarms: true })
      );
    });
  });

  describe('GET /moa/tokens', () => {
    it('should return a list of tokens', async () => {
      moaTokensServiceMocks.getMoaTokens.mockReturnValue([]);

      await request(app.getHttpServer())
        .get(`${path}/tokens`)
        .expect(200);

      expect(moaTokensServiceMocks.getMoaTokens).toHaveBeenCalledWith(
        new QueryPagination({ from: 0, size: 25 })
      );
    });

    it('should return a list of 5 tokens', async () => {
      moaTokensServiceMocks.getMoaTokens.mockReturnValue([]);
      const queryPagination = new QueryPagination();

      await request(app.getHttpServer())
        .get(`${path}/tokens?size=${queryPagination.size = 5}`)
        .expect(200);

      expect(moaTokensServiceMocks.getMoaTokens).toHaveBeenCalledWith(
        new QueryPagination({ from: 0, size: 5 })
      );
    });

    it('should return total moa tokens count', async () => {
      moaTokensServiceMocks.getMoaTokensCount.mockReturnValue(100);

      await request(app.getHttpServer())
        .get(`${path}/tokens/count`)
        .expect(200)
        .expect(response => {
          expect(+response.text).toStrictEqual(100);
        });

      expect(moaTokensServiceMocks.getMoaTokensCount).toHaveBeenCalled();
    });

    it('should return moa token details for a given token identifier', async () => {
      moaTokensServiceMocks.getMoaTokenByIdentifier.mockReturnValue({});
      const moaTokenIdentifier = 'MOA-455c57';

      await request(app.getHttpServer())
        .get(`${path}/tokens/${moaTokenIdentifier}`)
        .expect(200);

      expect(moaTokensServiceMocks.getMoaTokenByIdentifier).toHaveBeenCalledWith(moaTokenIdentifier);
    });

    it('should thorow 400 Bad Request for a given invalid token identifier', async () => {
      moaTokensServiceMocks.getMoaTokenByIdentifier.mockReturnValue({});
      const moaTokenIdentifier = 'MOA-455c57-Invalid';

      await request(app.getHttpServer())
        .get(`${path}/tokens/${moaTokenIdentifier}`)
        .expect(400)
        .expect(response => {
          expect(response.body.message).toStrictEqual("Validation failed for argument 'identifier': Invalid token identifier.");
        });
    });
  });

  describe('GET /moa/farms', () => {
    it('should return a list of moa farms', async () => {
      moaFarmsServiceMocks.getMoaFarms.mockReturnValue([]);

      await request(app.getHttpServer())
        .get(`${path}/farms`)
        .expect(200);

      expect(moaFarmsServiceMocks.getMoaFarms).toHaveBeenCalledWith(
        new QueryPagination({ from: 0, size: 25 })
      );
    });

    it('should return a list of 5 moa farms', async () => {
      moaFarmsServiceMocks.getMoaFarms.mockReturnValue([]);
      const queryPagination = new QueryPagination();

      await request(app.getHttpServer())
        .get(`${path}/farms?size=${queryPagination.size = 5}`)
        .expect(200);

      expect(moaFarmsServiceMocks.getMoaFarms).toHaveBeenCalledWith(
        new QueryPagination({ from: 0, size: 5 })
      );
    });

    it('should return total moa farms count', async () => {
      moaFarmsServiceMocks.getMoaFarmsCount.mockReturnValue(10);

      await request(app.getHttpServer())
        .get(`${path}/farms/count`)
        .expect(200);

      expect(moaFarmsServiceMocks.getMoaFarmsCount).toHaveBeenCalled();
    });
  });
});
