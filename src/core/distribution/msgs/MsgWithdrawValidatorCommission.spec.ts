import { MsgWithdrawValidatorCommission } from './MsgWithdrawValidatorCommission';
import MsgWithdrawValidatorCommissionAmino from './MsgWithdrawValidatorCommission.data.json';

describe('MsgWithdrawValidatorCommission', () => {
  it('deserializes', () => {
    MsgWithdrawValidatorCommissionAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgWithdrawValidatorCommission') {
          const e = MsgWithdrawValidatorCommission.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
