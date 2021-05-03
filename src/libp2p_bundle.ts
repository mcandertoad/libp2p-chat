import Libp2p, { constructorOptions, Libp2pOptions } from 'libp2p'
//@ts-ignore
import TCP from 'libp2p-tcp'
//@ts-ignore
import MPLEX from 'libp2p-mplex'
import { NOISE } from 'libp2p-noise'
//@ts-ignore
import defaultsDeep from '@nodeutils/defaults-deep'

const DEFAULT_OPTIONS = {
  modules: {
    transport: [TCP],
    streamMuxer: [MPLEX],
    connEncryption: [NOISE]
  }
}

const create = (opts: Partial<Libp2pOptions & constructorOptions>) => {
  return Libp2p.create(defaultsDeep(opts, DEFAULT_OPTIONS))
}

export default {create}