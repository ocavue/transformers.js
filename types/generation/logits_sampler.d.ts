declare const LogitsSampler_base: new () => {
    (...args: any[]): any;
    _call(...args: any[]): any;
};
/**
 * Sampler is a base class for all sampling methods used for text generation.
 */
export class LogitsSampler extends LogitsSampler_base {
    /**
     * Returns a Sampler object based on the specified options.
     * @param {GenerationConfig} generation_config An object containing options for the sampler.
     * @returns {LogitsSampler} A Sampler object.
     */
    static getSampler(generation_config: GenerationConfig): LogitsSampler;
    /**
     * Creates a new Sampler object with the specified generation config.
     * @param {GenerationConfig} generation_config The generation config.
     */
    constructor(generation_config: GenerationConfig);
    generation_config: GenerationConfig;
    /**
     * Executes the sampler, using the specified logits.
     * @param {Tensor} logits
     * @param {number} index
     * @returns {[number, number][]}
     */
    _call(logits: Tensor, index?: number): [number, number][];
    /**
     * Abstract method for sampling the logits.
     * @param {Tensor} logits
     * @param {number} index
     * @throws {Error}
     * @returns {[number, number][]}
     */
    sample(logits: Tensor, index: number): [number, number][];
    /**
     * Returns the specified logits as an array, with temperature applied.
     * @param {Tensor} logits
     * @param {number} index
     * @returns {Float32Array}
     */
    getLogits(logits: Tensor, index: number): Float32Array;
    /**
     * Selects an item randomly based on the specified probabilities.
     * @param {Array} probabilities An array of probabilities to use for selection.
     * @returns {number} The index of the selected item.
     */
    randomSelect(probabilities: any[]): number;
}
import { GenerationConfig } from '../generation/configuration_utils.js';
import { Tensor } from "../utils/tensor.js";
export {};
//# sourceMappingURL=logits_sampler.d.ts.map