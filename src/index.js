import 'plyr/dist/plyr.css'
import { www88dmw, www88dmwSetup } from './88dmw'
import { agefans } from './agefans'
import { local } from './utils/local'
import { yhdm } from './yhdm'

function setup() {
  if (origin.includes('88dmw')) {
    www88dmwSetup()
  }
}

function run() {
  const origin = window.location.origin
  if (
    origin.includes('agefans') ||
    origin.includes('agemys') ||
    origin.includes('age.tv')
  ) {
    agefans()
  }

  yhdm()

  if (origin.includes('88dmw')) {
    www88dmw()
  }
}

/**
 * 存储地方换了，迁移一下数据。几个版本后删除
 */
function migrationStorage() {
  const mergeKey = 'agefans-local-merge'
  const isMerged = local.getItem(mergeKey)
  if (isMerged) return
  local.setItem(mergeKey, true)

  const waitToMergeKeys = ['v-his', 'play-url-key', 'kplayer']
  waitToMergeKeys.forEach((key) => {
    const value = window.localStorage.getItem(key)
    if (value) {
      local.setItem(key, JSON.parse(value))
    }
  })
}

migrationStorage()
setup()
window.addEventListener('DOMContentLoaded', run)
