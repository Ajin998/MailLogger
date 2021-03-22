import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MailService } from './mailLog.service';

const mockMailModule = () => ({
  find: jest.fn(),
  create: jest.fn(),
});
describe('MailService', () => {
  let mailService;
  let mailmodel;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: getModelToken('Mail'), useFactory: mockMailModule },
      ],
    }).compile();
    mailService = module.get<MailService>(MailService);
    mailmodel = module.get(getModelToken('Mail'));
  });

  describe('fetchLogs', () => {
    const data = [
      { uid: 1, action: 'SignOff', message: 'User0 removed' },
      { uid: 2, action: 'SignUp', message: 'User1 added' },
      {
        uid: 3,
        action: 'RoleChange',
        message: 'User1 assigned admin role',
      },
    ];
    it('should not call fetchLog method', () => {
      expect(mailmodel.find).not.toHaveBeenCalled();
    });

    it('should fetch all the logs from the database', async () => {
      mailmodel.find.mockResolvedValue(data);
      const result = await mailService.fetchLogs();
      expect(result).toEqual(data);
    });
  });

  describe('WriteLogs', () => {
    it('should write logs in database', async () => {
      const log = {
        action: 'SignUp',
        message: 'New User created',
        createdBy: 'User1',
        createdAt: new Date(),
      };
      mailmodel.create.mockResolvedValue(log);
      const MailDto = {
        uid: 1,
        action: 'Signup',
        message: 'Hello',
        actionType: 'Ticket',
        createdBy: 'Ticket generated',
        createdAt: new Date(),
      };
      const res = await mailService.writeLog(MailDto);
      expect(res).toEqual(log);
    });
    it('should throw error if nothing is passed', async () => {
      mailmodel.create.mockRejectedValue(
        new InternalServerErrorException('Failed to write logs in database'),
      );
      try {
        await mailService.writeLog({});
      } catch (err) {
        expect(err).toEqual(
          new InternalServerErrorException('Failed to write logs in database'),
        );
      }
    });
  });
});
