import { Hero } from './Hero';

export interface HeroResponse {
    heros: Array<Hero>
    message?: string
}