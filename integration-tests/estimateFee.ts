import {
  LCDClient,
  MsgSend,
  Coin,
  CreateTxOptions,
} from '../src';
import Axios from 'axios';

async function main() {
  const { data: gasPrices } = await Axios.get(
    'https://fcd.terra.dev/v1/txs/gas_prices'
  );

  const columbus = new LCDClient({
    chainID: 'columbus-5',
    URL: 'https://lcd.terra.dev',
    gasPrices,
  });

  const accountInfo = await columbus.auth.accountInfo(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v'
  );

  /*
  {"msgs":["{\"@type\":\"/ibc.applications.transfer.v1.MsgTransfer\",\"receiver\":\"osmo1e07gcj02nqhdyj2lfndsx0zzphuz5mvm2kzt6y\",\"sender\":\"terra1zsky63r58vc7dfn3ljj32ch6fyn4e5qd8skzyz\",\"source_channel\":\"channel-72\",\"source_port\":\"transfer\",\"timeout_timestamp\":\"1635304311760999936\",\"token\":{\"amount\":\"1000\",\"denom\":\"ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B\"}}"],"memo":"IBC Test mobile","gasPrices":"0.15uusd","gasAdjustment":"1.75"}
  */

  const msgs = [
    new MsgSend(
    	"terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v",
    	"terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp",
    	"1uluna"
    ),
  ];

  const memo = 'IBC Test mobile';
  const txOptions: CreateTxOptions = {
    msgs,
    memo,
    gasPrices,
    gasAdjustment: 1.75,
  };
  // Test raw estimate fee function with specified gas
  const rawFee = await columbus.tx.estimateFee(
    [
      {
        sequenceNumber: accountInfo.getSequenceNumber(),
        publicKey: accountInfo.getPublicKey(),
      },
    ],
    txOptions
  );

  console.log('MsgSwap(500000 gas): ', rawFee.toData());
}

main().catch(console.error);
