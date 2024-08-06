/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
declare type Recordable<T = string> = Record<string, T>
declare interface ViteEnv {
    VITE_PORT: number
    VITE_USE_PWA: boolean
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
}

type ProxyItem = [string, string]
type ProxyList = ProxyItem[]
type ProxyTargetList = Record<string, ProxyOptions>
const httpsRE = /^https:\/\//

type MultiKeyType = string | number | boolean

/**
 * 获取环境变量
 * @param envConf vite loadEnv() 函数返回值
 * @returns ViteEnv
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
    const ret: any = {}
    for (const envName of Object.keys(envConf)) {
        let realName: MultiKeyType = envConf[envName].replace(/\\n/g, '\n')
        realName = realName === 'true' ? true : realName === 'false' ? false : realName

        if (envName === 'VITE_PORT') {
            realName = Number(realName)
        }
        if (envName === 'VITE_PROXY' && realName) {
            try {
                realName = JSON.parse((realName as string).replace(/'/g, '"'))
            } catch (error) {
                realName = ''
            }
        }
        ret[envName] = realName
        if (typeof realName === 'string') {
            process.env[envName] = realName
        } else if (typeof realName === 'object') {
            process.env[envName] = JSON.stringify(realName)
        }
    }
    return ret
}

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []) {
    const ret: ProxyTargetList = {}
    for (const [prefix, target] of list) {
        const isHttps = httpsRE.test(target)

        ret[prefix] = {
            target: target,
            changeOrigin: true,
            ws: true,
            rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
            // https is require secure=false
            ...(isHttps ? { secure: false } : {})
        }
    }
    return ret
}

export function createPlugins() {
    const plugins = [
        react(),
        legacy({
            targets: ['defaults', 'not IE 11']
        })
    ]
    return plugins
}
