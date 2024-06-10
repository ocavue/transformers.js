declare const LogitsProcessorList_base: new () => {
    (...args: any[]): any;
    _call(...args: any[]): any;
};
/**
 * A class representing a list of logits processors. A logits processor is a function that modifies the logits
 * output of a language model. This class provides methods for adding new processors and applying all processors to a
 * batch of logits.
 *
 * @extends Callable
 */
export class LogitsProcessorList extends LogitsProcessorList_base {
    processors: any[];
    /**
     * Adds a new logits processor to the list.
     *
     * @param {LogitsProcessor} item The logits processor function to add.
     */
    push(item: LogitsProcessor): void;
    /**
     * Adds multiple logits processors to the list.
     *
     * @param {LogitsProcessor[]} items The logits processor functions to add.
     */
    extend(items: LogitsProcessor[]): void;
    /**
     * Applies all logits processors in the list to a batch of logits, modifying them in-place.
     *
     * @param {number[]} input_ids The input IDs for the language model.
     * @param {number[][]} batchedLogits A 2D array of logits, where each row corresponds to a single
     *                                                input sequence in the batch.
     */
    _call(input_ids: number[], batchedLogits: number[][]): void;
    [Symbol.iterator](): IterableIterator<any>;
}
declare const LogitsProcessor_base: new () => {
    (...args: any[]): any;
    _call(...args: any[]): any;
};
/**
 * Base class for processing logits.
 * @extends Callable
 */
export class LogitsProcessor extends LogitsProcessor_base {
    /**
     * Apply the processor to the input logits.
     *
     * @abstract
     * @param {Array} input_ids The input ids.
     * @param {Tensor} logits The logits to process.
     * @throws {Error} Throws an error if `_call` is not implemented in the subclass.
     */
    _call(input_ids: any[], logits: Tensor): void;
}
/**
 * A logits processor that forces a specific token to be generated by the decoder.
 *
 * @extends LogitsProcessor
 */
export class ForceTokensLogitsProcessor extends LogitsProcessor {
    /**
     * Constructs a new instance of `ForceTokensLogitsProcessor`.
     *
     * @param {Array} forced_decoder_ids The ids of tokens that should be forced.
     */
    constructor(forced_decoder_ids: any[]);
    force_token_map: {
        [k: string]: any;
    };
    /**
     * Apply the processor to the input logits.
     *
     * @param {Array} input_ids The input ids.
     * @param {Tensor} logits The logits to process.
     * @returns {Tensor} The processed logits.
     */
    _call(input_ids: any[], logits: Tensor): Tensor;
}
/**
 * A LogitsProcessor that forces a BOS token at the beginning of the generated sequence.
 * @extends LogitsProcessor
 */
export class ForcedBOSTokenLogitsProcessor extends LogitsProcessor {
    /**
     * Create a ForcedBOSTokenLogitsProcessor.
     * @param {number} bos_token_id The ID of the beginning-of-sequence token to be forced.
     */
    constructor(bos_token_id: number);
    bos_token_id: number;
    /**
     * Apply the BOS token forcing to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with BOS token forcing.
     */
    _call(input_ids: any[], logits: any): any;
}
/**
 * A logits processor that forces end-of-sequence token probability to 1.
 *
 * @extends LogitsProcessor
 */
export class ForcedEOSTokenLogitsProcessor extends LogitsProcessor {
    /**
     * Create a ForcedEOSTokenLogitsProcessor.
     * @param {number} max_length Max length of the sequence.
     * @param {number|number[]} forced_eos_token_id The ID of the end-of-sequence token to be forced.
     */
    constructor(max_length: number, forced_eos_token_id: number | number[]);
    max_length: number;
    forced_eos_token_id: number | number[];
    /**
     * Apply the processor to input_ids and logits.
     *
     * @param {number[]} input_ids The input ids.
     * @param {Tensor} logits The logits tensor.
     */
    _call(input_ids: number[], logits: Tensor): void;
}
/**
 * A LogitsProcessor that suppresses a list of tokens as soon as the `generate` function starts
 * generating using `begin_index` tokens. This should ensure that the tokens defined by
 * `begin_suppress_tokens` at not sampled at the begining of the generation.
 * @extends LogitsProcessor
 */
export class SuppressTokensAtBeginLogitsProcessor extends LogitsProcessor {
    /**
     * Create a SuppressTokensAtBeginLogitsProcessor.
     * @param {number[]} begin_suppress_tokens The IDs of the tokens to suppress.
     * @param {number} begin_index The number of tokens to generate before suppressing tokens.
     */
    constructor(begin_suppress_tokens: number[], begin_index: number);
    begin_suppress_tokens: number[];
    begin_index: number;
    /**
     * Apply the BOS token forcing to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with BOS token forcing.
     */
    _call(input_ids: any[], logits: any): any;
}
/**
 * A LogitsProcessor that handles adding timestamps to generated text.
 * @extends LogitsProcessor
 */
export class WhisperTimeStampLogitsProcessor extends LogitsProcessor {
    /**
     * Constructs a new WhisperTimeStampLogitsProcessor.
     * @param {Object} generate_config The config object passed to the `generate()` method of a transformer model.
     * @param {number} generate_config.eos_token_id The ID of the end-of-sequence token.
     * @param {number} generate_config.no_timestamps_token_id The ID of the token used to indicate that a token should not have a timestamp.
     * @param {number[][]} [generate_config.forced_decoder_ids] An array of two-element arrays representing decoder IDs that are forced to appear in the output. The second element of each array indicates whether the token is a timestamp.
     * @param {number} [generate_config.max_initial_timestamp_index] The maximum index at which an initial timestamp can appear.
     */
    constructor(generate_config: {
        eos_token_id: number;
        no_timestamps_token_id: number;
        forced_decoder_ids?: number[][];
        max_initial_timestamp_index?: number;
    });
    eos_token_id: number;
    no_timestamps_token_id: number;
    timestamp_begin: number;
    begin_index: number;
    max_initial_timestamp_index: number;
    /**
     * Modify the logits to handle timestamp tokens.
     * @param {Array} input_ids The input sequence of tokens.
     * @param {Tensor} logits The logits output by the model.
     * @returns {Tensor} The modified logits.
     */
    _call(input_ids: any[], logits: Tensor): Tensor;
}
/**
 * A logits processor that disallows ngrams of a certain size to be repeated.
 *
 * @extends LogitsProcessor
 */
export class NoRepeatNGramLogitsProcessor extends LogitsProcessor {
    /**
     * Create a NoRepeatNGramLogitsProcessor.
     * @param {number} no_repeat_ngram_size The no-repeat-ngram size. All ngrams of this size can only occur once.
     */
    constructor(no_repeat_ngram_size: number);
    no_repeat_ngram_size: number;
    /**
     * Generate n-grams from a sequence of token ids.
     * @param {number[]} prevInputIds List of previous input ids
     * @returns {Map<string, number[]>} Map of generated n-grams
     */
    getNgrams(prevInputIds: number[]): Map<string, number[]>;
    /**
     * Generate n-grams from a sequence of token ids.
     * @param {Map<string, number[]>} bannedNgrams Map of banned n-grams
     * @param {number[]} prevInputIds List of previous input ids
     * @returns {number[]} Map of generated n-grams
     */
    getGeneratedNgrams(bannedNgrams: Map<string, number[]>, prevInputIds: number[]): number[];
    /**
     * Calculate banned n-gram tokens
     * @param {number[]} prevInputIds List of previous input ids
     * @returns {number[]} Map of generated n-grams
     */
    calcBannedNgramTokens(prevInputIds: number[]): number[];
    /**
     * Apply the no-repeat-ngram processor to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with no-repeat-ngram processing.
     */
    _call(input_ids: any[], logits: any): any;
}
/**
 * A logits processor that penalises repeated output tokens.
 *
 * @extends LogitsProcessor
 */
export class RepetitionPenaltyLogitsProcessor extends LogitsProcessor {
    /**
     * Create a RepetitionPenaltyLogitsProcessor.
     * @param {number} penalty The penalty to apply for repeated tokens.
     */
    constructor(penalty: number);
    penalty: number;
    /**
     * Apply the repetition penalty to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with repetition penalty processing.
     */
    _call(input_ids: any[], logits: any): any;
}
/**
 * A logits processor that enforces a minimum number of tokens.
 *
 * @extends LogitsProcessor
 */
export class MinLengthLogitsProcessor extends LogitsProcessor {
    /**
     * Create a MinLengthLogitsProcessor.
     * @param {number} min_length The minimum length below which the score of `eos_token_id` is set to negative infinity.
     * @param {number|number[]} eos_token_id The ID/IDs of the end-of-sequence token.
     */
    constructor(min_length: number, eos_token_id: number | number[]);
    min_length: number;
    eos_token_id: number[];
    /**
     * Apply logit processor.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The processed logits.
     */
    _call(input_ids: any[], logits: any): any;
}
/**
 * A logits processor that enforces a minimum number of new tokens.
 *
 * @extends LogitsProcessor
 */
export class MinNewTokensLengthLogitsProcessor extends LogitsProcessor {
    /**
     * Create a MinNewTokensLengthLogitsProcessor.
     * @param {number} prompt_length_to_skip The input tokens length.
     * @param {number} min_new_tokens The minimum *new* tokens length below which the score of `eos_token_id` is set to negative infinity.
     * @param {number|number[]} eos_token_id The ID/IDs of the end-of-sequence token.
     */
    constructor(prompt_length_to_skip: number, min_new_tokens: number, eos_token_id: number | number[]);
    prompt_length_to_skip: number;
    min_new_tokens: number;
    eos_token_id: number[];
    /**
     * Apply logit processor.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The processed logits.
     */
    _call(input_ids: any[], logits: any): any;
}
/**
 * Class that holds a configuration for a generation task.
 */
export class GenerationConfig {
    /**
     * Create a GenerationConfig object
     * @param {Object} [kwargs={}] The configuration parameters. If not set, the default values are used.
     * @param {number} [kwargs.max_length=20] The maximum length the generated tokens can have. Corresponds to the length of the input prompt + `max_new_tokens`. Its effect is overridden by `max_new_tokens`, if also set.
     * @param {number} [kwargs.max_new_tokens=null] The maximum numbers of tokens to generate, ignoring the number of tokens in the prompt.
     * @param {number} [kwargs.min_length=0] The minimum length of the sequence to be generated. Corresponds to the length of the input prompt + `min_new_tokens`. Its effect is overridden by `min_new_tokens`, if also set.
     * @param {number} [kwargs.min_new_tokens=null] The minimum numbers of tokens to generate, ignoring the number of tokens in the prompt.
     * @param {boolean|"never"} [kwargs.early_stopping=false] Controls the stopping condition for beam-based methods, like beam-search. It accepts the following values:
     * - `true`, where the generation stops as soon as there are `num_beams` complete candidates;
     * - `false`, where an heuristic is applied and the generation stops when is it very unlikely to find better candidates;
     * - `"never"`, where the beam search procedure only stops when there cannot be better candidates (canonical beam search algorithm).
     * @param {number} [kwargs.max_time=null] The maximum amount of time you allow the computation to run for in seconds. Generation will still finish the current pass after allocated time has been passed.
     *
     * @param {boolean} [kwargs.do_sample=false] Whether or not to use sampling; use greedy decoding otherwise.
     * @param {number} [kwargs.num_beams=1] Number of beams for beam search. 1 means no beam search.
     * @param {number} [kwargs.num_beam_groups=1] Number of groups to divide `num_beams` into in order to ensure diversity among different groups of beams. See [this paper](https://arxiv.org/pdf/1610.02424.pdf) for more details.
     * @param {number} [kwargs.penalty_alpha=null] The values balance the model confidence and the degeneration penalty in contrastive search decoding.
     * @param {boolean} [kwargs.use_cache=true] Whether or not the model should use the past last key/values attentions (if applicable to the model) to speed up decoding.
     *
     * @param {number} [kwargs.temperature=1.0] The value used to modulate the next token probabilities.
     * @param {number} [kwargs.top_k=50] The number of highest probability vocabulary tokens to keep for top-k-filtering.
     * @param {number} [kwargs.top_p=1.0] If set to float < 1, only the smallest set of most probable tokens with probabilities that add up to `top_p` or higher are kept for generation.
     * @param {number} [kwargs.typical_p=1.0] Local typicality measures how similar the conditional probability of predicting a target token next is to the expected conditional probability of predicting a random token next, given the partial text already generated. If set to float < 1, the smallest set of the most locally typical tokens with probabilities that add up to `typical_p` or higher are kept for generation. See [this paper](https://arxiv.org/pdf/2202.00666.pdf) for more details.
     * @param {number} [kwargs.epsilon_cutoff=0.0] If set to float strictly between 0 and 1, only tokens with a conditional probability greater than `epsilon_cutoff` will be sampled. In the paper, suggested values range from 3e-4 to 9e-4, depending on the size of the model. See [Truncation Sampling as Language Model Desmoothing](https://arxiv.org/abs/2210.15191) for more details.
     * @param {number} [kwargs.eta_cutoff=0.0] Eta sampling is a hybrid of locally typical sampling and epsilon sampling. If set to float strictly between 0 and 1, a token is only considered if it is greater than either `eta_cutoff` or `sqrt(eta_cutoff) * exp(-entropy(softmax(next_token_logits)))`. The latter term is intuitively the expected next token probability, scaled by `sqrt(eta_cutoff)`. In the paper, suggested values range from 3e-4 to 2e-3, depending on the size of the model. See [Truncation Sampling as Language Model Desmoothing](https://arxiv.org/abs/2210.15191) for more details.
     * @param {number} [kwargs.diversity_penalty=0.0] This value is subtracted from a beam's score if it generates a token same as any beam from other group at a particular time. Note that `diversity_penalty` is only effective if `group beam search` is enabled.
     * @param {number} [kwargs.repetition_penalty=1.0] The parameter for repetition penalty. 1.0 means no penalty. See [this paper](https://arxiv.org/pdf/1909.05858.pdf) for more details.
     * @param {number} [kwargs.encoder_repetition_penalty=1.0] The paramater for encoder_repetition_penalty. An exponential penalty on sequences that are not in the original input. 1.0 means no penalty.
     * @param {number} [kwargs.length_penalty=1.0] Exponential penalty to the length that is used with beam-based generation. It is applied as an exponent to the sequence length, which in turn is used to divide the score of the sequence. Since the score is the log likelihood of the sequence (i.e. negative), `length_penalty` > 0.0 promotes longer sequences, while `length_penalty` < 0.0 encourages shorter sequences.
     * @param {number} [kwargs.no_repeat_ngram_size=0] If set to int > 0, all ngrams of that size can only occur once.
     * @param {number[][]} [kwargs.bad_words_ids=null] List of token ids that are not allowed to be generated. In order to get the token ids of the words that should not appear in the generated text, use `(await tokenizer(bad_words, {add_prefix_space: true, add_special_tokens: false})).input_ids`.
     * @param {number[][]|number[][][]} [kwargs.force_words_ids=null] List of token ids that must be generated. If given a `number[][]`, this is treated as a simple list of words that must be included, the opposite to `bad_words_ids`. If given `number[][][]`, this triggers a [disjunctive constraint](https://github.com/huggingface/transformers/issues/14081), where one can allow different forms of each word.
     * @param {boolean} [kwargs.renormalize_logits=false] Whether to renormalize the logits after applying all the logits processors or warpers (including the custom ones). It's highly recommended to set this flag to `true` as the search algorithms suppose the score logits are normalized but some logit processors or warpers break the normalization.
     * @param {Object[]} [kwargs.constraints=null] Custom constraints that can be added to the generation to ensure that the output will contain the use of certain tokens as defined by `Constraint` objects, in the most sensible way possible.
     *
     * @param {number} [kwargs.forced_bos_token_id=null] The id of the token to force as the first generated token after the `decoder_start_token_id`. Useful for multilingual models like mBART where the first generated token needs to be the target language token.
     * @param {number|number[]} [kwargs.forced_eos_token_id=null] The id of the token to force as the last generated token when `max_length` is reached. Optionally, use a list to set multiple *end-of-sequence* tokens.
     * @param {boolean} [kwargs.remove_invalid_values=false] Whether to remove possible *nan* and *inf* outputs of the model to prevent the generation method to crash. Note that using `remove_invalid_values` can slow down generation.
     * @param {number[]} [kwargs.exponential_decay_length_penalty=null] This Tuple adds an exponentially increasing length penalty, after a certain amount of tokens have been generated. The tuple shall consist of: `(start_index, decay_factor)` where `start_index` indicates where penalty starts and `decay_factor` represents the factor of exponential decay.
     * @param {number[]} [kwargs.suppress_tokens=null] A list of tokens that will be suppressed at generation. The `SupressTokens` logit processor will set their log probs to `-inf` so that they are not sampled.
     * @param {number[]} [kwargs.begin_suppress_tokens=null] A list of tokens that will be suppressed at the beginning of the generation. The `SupressBeginTokens` logit processor will set their log probs to `-inf` so that they are not sampled.
     * @param {number[][]} [kwargs.forced_decoder_ids=null] A list of pairs of integers which indicates a mapping from generation indices to token indices that will be forced before sampling. For example, `[[1, 123]]` means the second generated token will always be a token of index 123.
     *
     * @param {number} [kwargs.num_return_sequences=1] The number of independently computed returned sequences for each element in the batch.
     * @param {boolean} [kwargs.output_attentions=false] Whether or not to return the attentions tensors of all attention layers. See `attentions` under returned tensors for more details.
     * @param {boolean} [kwargs.output_hidden_states=false] Whether or not to return the hidden states of all layers. See `hidden_states` under returned tensors for more details.
     * @param {boolean} [kwargs.output_scores=false] Whether or not to return the prediction scores. See `scores` under returned tensors for more details.
     * @param {boolean} [kwargs.return_dict_in_generate=false] Whether or not to return a `ModelOutput` instead of a plain tuple.
     *
     * @param {number} [kwargs.pad_token_id=null] The id of the *padding* token.
     * @param {number} [kwargs.bos_token_id=null] The id of the *beginning-of-sequence* token.
     * @param {number|number[]} [kwargs.eos_token_id=null] The id of the *end-of-sequence* token. Optionally, use a list to set multiple *end-of-sequence* tokens.
     *
     * @param {number} [kwargs.encoder_no_repeat_ngram_size=0] If set to int > 0, all ngrams of that size that occur in the `encoder_input_ids` cannot occur in the `decoder_input_ids`.
     * @param {number} [kwargs.decoder_start_token_id=null] If an encoder-decoder model starts decoding with a different token than *bos*, the id of that token.
     *
     * @param {Object} [kwargs.generation_kwargs={}] Additional generation kwargs will be forwarded to the `generate` function of the model. Kwargs that are not present in `generate`'s signature will be used in the model forward pass.
     */
    constructor(kwargs?: {
        max_length?: number;
        max_new_tokens?: number;
        min_length?: number;
        min_new_tokens?: number;
        early_stopping?: boolean | "never";
        max_time?: number;
        do_sample?: boolean;
        num_beams?: number;
        num_beam_groups?: number;
        penalty_alpha?: number;
        use_cache?: boolean;
        temperature?: number;
        top_k?: number;
        top_p?: number;
        typical_p?: number;
        epsilon_cutoff?: number;
        eta_cutoff?: number;
        diversity_penalty?: number;
        repetition_penalty?: number;
        encoder_repetition_penalty?: number;
        length_penalty?: number;
        no_repeat_ngram_size?: number;
        bad_words_ids?: number[][];
        force_words_ids?: number[][] | number[][][];
        renormalize_logits?: boolean;
        constraints?: any[];
        forced_bos_token_id?: number;
        forced_eos_token_id?: number | number[];
        remove_invalid_values?: boolean;
        exponential_decay_length_penalty?: number[];
        suppress_tokens?: number[];
        begin_suppress_tokens?: number[];
        forced_decoder_ids?: number[][];
        num_return_sequences?: number;
        output_attentions?: boolean;
        output_hidden_states?: boolean;
        output_scores?: boolean;
        return_dict_in_generate?: boolean;
        pad_token_id?: number;
        bos_token_id?: number;
        eos_token_id?: number | number[];
        encoder_no_repeat_ngram_size?: number;
        decoder_start_token_id?: number;
        generation_kwargs?: any;
    });
    max_length: number;
    max_new_tokens: number;
    min_length: number;
    min_new_tokens: number;
    early_stopping: boolean | "never";
    max_time: number;
    do_sample: boolean;
    num_beams: number;
    num_beam_groups: number;
    penalty_alpha: number;
    use_cache: boolean;
    temperature: number;
    top_k: number;
    top_p: number;
    typical_p: number;
    epsilon_cutoff: number;
    eta_cutoff: number;
    diversity_penalty: number;
    repetition_penalty: number;
    encoder_repetition_penalty: number;
    length_penalty: number;
    no_repeat_ngram_size: number;
    bad_words_ids: number[][];
    force_words_ids: number[][] | number[][][];
    renormalize_logits: boolean;
    constraints: any[];
    forced_bos_token_id: number;
    forced_eos_token_id: number | number[];
    remove_invalid_values: boolean;
    exponential_decay_length_penalty: number[];
    suppress_tokens: number[];
    begin_suppress_tokens: number[];
    forced_decoder_ids: number[][];
    num_return_sequences: number;
    output_attentions: boolean;
    output_hidden_states: boolean;
    output_scores: boolean;
    return_dict_in_generate: boolean;
    pad_token_id: number;
    bos_token_id: number;
    eos_token_id: number | number[];
    encoder_no_repeat_ngram_size: number;
    decoder_start_token_id: number;
    generation_kwargs: any;
}
declare const Sampler_base: new () => {
    (...args: any[]): any;
    _call(...args: any[]): any;
};
/**
 * Sampler is a base class for all sampling methods used for text generation.
 */
export class Sampler extends Sampler_base {
    /**
     * Returns a Sampler object based on the specified options.
     * @param {GenerationConfig} generation_config An object containing options for the sampler.
     * @returns {Sampler} A Sampler object.
     */
    static getSampler(generation_config: GenerationConfig): Sampler;
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
     * @returns {void}
     */
    _call(logits: Tensor, index?: number): void;
    /**
     * Abstract method for sampling the logits.
     * @param {Tensor} logits
     * @param {number} index
     * @throws {Error}
     */
    sample(logits: Tensor, index: number): void;
    /**
     * Returns the specified logits as an array, with temperature applied.
     * @param {Tensor} logits
     * @param {number} index
     * @returns {Array}
     */
    getLogits(logits: Tensor, index: number): any[];
    /**
     * Selects an item randomly based on the specified probabilities.
     * @param {Array} probabilities An array of probabilities to use for selection.
     * @returns {number} The index of the selected item.
     */
    randomSelect(probabilities: any[]): number;
}
import { Tensor } from './tensor.js';
export {};
//# sourceMappingURL=generation.d.ts.map