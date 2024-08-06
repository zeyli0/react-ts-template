import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'

import { wrapperEnv, createProxy, createPlugins } from './src/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    const viteEnv = wrapperEnv(env)

    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
    return {
        base: VITE_PUBLIC_PATH,
        publicDir: '',
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            host: true,
            port: VITE_PORT,
            proxy: createProxy(VITE_PROXY)
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        hack: `true; @import (reference) "${resolve('src/style/color.less')}";`
                    },
                    javascriptEnabled: true
                }
            }
        },
        plugins: createPlugins()
    }
})
