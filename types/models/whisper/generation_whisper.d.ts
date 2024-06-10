export class WhisperGenerationConfig extends GenerationConfig {
    /**
     * Whether to return the timestamps with the text. This enables the `WhisperTimestampsLogitsProcessor`.
     * @type {boolean}
     */
    return_timestamps: boolean;
    /**
     * Whether to return token-level timestamps
     * with the text. This can be used with or without the `return_timestamps` option. To get word-level
     * timestamps, use the tokenizer to group the tokens into words.
     * @type {boolean}
     */
    return_token_timestamps: boolean;
    /**
     * The number of audio frames available in this chunk. This is only used generating word-level timestamps.
     * @type {number}
     */
    num_frames: number;
    /**
     * Alignment heads to predict word-level timestamps. This is a list of [layer, head] pairs that
     * select the cross-attention heads that are highly correlated to word-level timing.
     * @type {[number, number][]}
     */
    alignment_heads: [number, number][];
    /**
     * Task to use for generation, either "translate" or "transcribe".
     * @type {string}
     */
    task: string;
    /**
     * Language token to use for generation, can be either in the form of `<|en|>`, `en` or `english`.
     * You can find all the possible language tokens in the `model.generation_config.lang_to_id` dictionary.
     * @type {string}
     */
    language: string;
    /**
     * The id of the `"<|notimestamps|>"` token.
     * @type {number}
     */
    no_timestamps_token_id: number;
    /**
     * Rank-1 list of token IDs created by passing text to [`~WhisperProcessor.get_prompt_ids`] that is
     * provided as a prompt to each chunk. This can be used to provide or "prompt-engineer" a context for
     * transcription, e.g. custom vocabularies or proper nouns to make it more likely to predict those words
     * correctly. It cannot be used in conjunction with `decoder_start_token_id` as it overwrites this value.
     * @type {number[]}
     */
    prompt_ids: number[];
    /**
     * Whether the model is multilingual or not.
     * @type {boolean}
     */
    is_multilingual: boolean;
    /**
     * (Optional) A mapping from language tokens to their corresponding IDs.
     * Only required if the model is multilingual.
     * @type {Record<string, number>|null}
     */
    lang_to_id: Record<string, number> | null;
    /**
     * (Optional) A mapping from task tokens to their corresponding IDs.
     * @type {Record<string, number>|null}
     */
    task_to_id: Record<string, number> | null;
    /**
     * Used to set the maximum value of the initial timestamp. This is used to prevent the model from
     * predicting timestamps that are too far in the future.
     * @type {number}
     */
    max_initial_timestamp_index: number;
}
export type WhisperGenerationFunctionParameters = any & {
    generation_config: WhisperGenerationConfig;
} & WhisperGenerationConfig;
import { GenerationConfig } from "../../generation/configuration_utils.js";
//# sourceMappingURL=generation_whisper.d.ts.map