import Node from "./libp2p_bundle.js"
import process from "process"
import chalk from "chalk"
import {multiaddr} from 'multiaddr'
import em from "node-emoji"
import { stdinToStream, streamToConsole } from './streams.js'

const main = async (moonPort: string, moonId: string) => {
  const nodeDialer = await Node.create({
    addresses: {
      listen: ['/ip4/127.0.0.1/tcp/0']
    }
  })
  await nodeDialer.start()
  let ma = multiaddr(`/ip4/127.0.0.1/tcp/${moonPort}/p2p/${moonId}`)
  
  const {stream} = await nodeDialer.dialProtocol(ma, '/chat/1.0.0')

  console.log(
    em.get("large_blue_circle"),
    chalk.green(" Connected to "),
    em.get("moon")
  )

  stdinToStream(stream)
  streamToConsole(stream)
}

if(process.argv.length >= 4) {
  console.log(
    em.get('large_blue_circle'),
    chalk.green(`Connecting to ${process.argv[2]} on port ${process.argv[3]}`),
    em.get("moon")
  )
  main(process.argv[3], process.argv[2])
} else {
  console.log(
    em.get("x"),
    chalk.red('I need an address in the arguments please')
  )
}