import PeerId from 'peer-id'
import Node from './libp2p_bundle.js'
import chalk from 'chalk'
import emoji from 'node-emoji'
import { stdinToStream, streamToConsole } from './streams.js'

const main = async () => {
  const nodeListener = await Node.create({
    addresses: {
      listen: ['/ip4/127.0.0.1/tcp/0']
    }
  })

  nodeListener.connectionManager.on('peer:connect', (conn) => {
    console.log(chalk.blue('connected to: ' + conn.remotePeer.toB58String()))
  })

  await nodeListener.handle('/chat/1.0.0', async({stream}) => {
    stdinToStream(stream)
    streamToConsole(stream)
  })
  
  await nodeListener.start()

  console.log(
    emoji.get('moon'), 
    chalk.blue(' Moon ready '),
    emoji.get('headphones'), 
    chalk.blue(' Listening on: '));
    nodeListener.multiaddrs.forEach((ma) => {
      console.log(ma.toString() + '/p2p/' + nodeListener.peerId.toB58String())
    })

    console.log(
      '\n' + emoji.get('moon'), 
      chalk.blue(' Moon trying to connect with Earth '),
      emoji.get('large_blue_circle')
  );
}

main()
