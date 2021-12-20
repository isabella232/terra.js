import { MsgSwap } from './MsgSwap';
import MsgSwapAmino from './MsgSwap.data.json';

describe('MsgSwap', () => {
  it('deserializes', () => {
    MsgSwapAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'market/MsgSwap') {
          const e = MsgSwap.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
