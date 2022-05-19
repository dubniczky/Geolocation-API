import { load } from 'js-yaml'
import { readFileSync } from 'fs'

const path = 'config.yml'
const config = load( readFileSync(path, 'utf8') )

export default config