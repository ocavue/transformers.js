declare const PreTrainedModel_base: new () => {
    (...args: any[]): any;
    _call(...args: any[]): any;
};
/**
 * A base class for pre-trained models that provides the model configuration and an ONNX session.
 * @extends Callable
 */
export class PreTrainedModel extends PreTrainedModel_base {
    /**
     * Instantiate one of the model classes of the library from a pretrained model.
     *
     * The model class to instantiate is selected based on the `model_type` property of the config object
     * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
     *
     * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
     * - A string, the *model id* of a pretrained model hosted inside a model repo on huggingface.co.
     *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
     *   user or organization name, like `dbmdz/bert-base-german-cased`.
     * - A path to a *directory* containing model weights, e.g., `./my_model_directory/`.
     * @param {PretrainedOptions} options Additional options for loading the model.
     *
     * @returns {Promise<PreTrainedModel>} A new instance of the `PreTrainedModel` class.
     */
    static from_pretrained(pretrained_model_name_or_path: string, { quantized, progress_callback, config, cache_dir, local_files_only, revision, model_file_name, }?: PretrainedOptions): Promise<PreTrainedModel>;
    /**
     * Creates a new instance of the `PreTrainedModel` class.
     * @param {Object} config The model configuration.
     * @param {any} session session for the model.
     */
    constructor(config: any, session: any);
    main_input_name: string;
    config: any;
    session: any;
    can_generate: boolean;
    _runBeam: typeof decoderRunBeam;
    _getStartBeams: typeof decoderStartBeams;
    _updateBeam: typeof decoderUpdatebeam;
    _forward: typeof encoderForward;
    /**
    * Disposes of all the ONNX sessions that were created during inference.
    * @returns {Promise<unknown[]>} An array of promises, one for each ONNX session that is being disposed.
    * @todo Use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry
    */
    dispose(): Promise<unknown[]>;
    /**
     * Runs the model with the provided inputs
     * @param {Object} model_inputs Object containing input tensors
     * @returns {Promise<Object>} Object containing output tensors
     */
    _call(model_inputs: any): Promise<any>;
    /**
     * Forward method for a pretrained model. If not overridden by a subclass, the correct forward method
     * will be chosen based on the model type.
     * @param {Object} model_inputs The input data to the model in the format specified in the ONNX model.
     * @returns {Promise<Object>} The output data from the model in the format specified in the ONNX model.
     * @throws {Error} This method must be implemented in subclasses.
     */
    forward(model_inputs: any): Promise<any>;
    /**
     * @param {GenerationConfig} generation_config
     * @param {number} input_ids_seq_length The starting sequence length for the input ids.
     * @returns {LogitsProcessorList}
     * @private
     */
    private _get_logits_processor;
    /**
     * This function merges multiple generation configs together to form a final generation config to be used by the model for text generation.
     * It first creates an empty `GenerationConfig` object, then it applies the model's own `generation_config` property to it. Finally, if a `generation_config` object was passed in the arguments, it overwrites the corresponding properties in the final config with those of the passed config object.
     *
     * @param {GenerationConfig} generation_config A `GenerationConfig` object containing generation parameters.
     * @returns {GenerationConfig} The final generation config object to be used by the model for text generation.
     */
    _get_generation_config(generation_config: GenerationConfig): GenerationConfig;
    /**
     * @typedef {import('./utils/maths.js').TypedArray} TypedArray
     */
    /**
     * @typedef {{ sequences: Tensor, decoder_attentions: Tensor, cross_attentions: Tensor }} EncoderDecoderOutput
     * @typedef {Object} DecoderOutput
     *
     * Generates text based on the given inputs and generation configuration using the model.
     * @param {Tensor|Array|TypedArray} inputs An array of input token IDs.
     * @param {Object|GenerationConfig|null} generation_config The generation configuration to use. If null, default configuration will be used.
     * @param {Object|null} logits_processor An optional logits processor to use. If null, a new LogitsProcessorList instance will be created.
     * @param {Object} options options
     * @param {Object} [options.inputs_attention_mask=null] An optional attention mask for the inputs.
     * @returns {Promise<number[][]|EncoderDecoderOutput|DecoderOutput>} An array of generated output sequences, where each sequence is an array of token IDs.
     * @throws {Error} Throws an error if the inputs array is empty.
     */
    generate(inputs: any[] | import("./transformers.js").TypedArray | Tensor, generation_config?: any | GenerationConfig | null, logits_processor?: any | null, { inputs_attention_mask }?: {
        inputs_attention_mask?: any;
    }): Promise<any>;
    /**
     * Helper function to add attentions to beam
     * @param {Object} beam
     * @param {Object} output
     * @private
     */
    private addAttentionsToBeam;
    /**
     * Groups an array of beam objects by their ids.
     *
     * @param {Array} beams The array of beam objects to group.
     * @returns {Array} An array of arrays, where each inner array contains beam objects with the same id.
     */
    groupBeams(beams: any[]): any[];
    /**
     * Returns an object containing past key values from the given decoder results object.
     *
     * @param {Object} decoderResults The decoder results object.
     * @param {Object} pastKeyValues The previous past key values.
     * @returns {Object} An object containing past key values.
     */
    getPastKeyValues(decoderResults: any, pastKeyValues: any): any;
    /**
     * Returns an object containing attentions from the given decoder results object.
     *
     * @param {Object} decoderResults The decoder results object.
     * @returns {Object} An object containing attentions.
     */
    getAttentions(decoderResults: any): any;
    /**
     * Adds past key values to the decoder feeds object. If pastKeyValues is null, creates new tensors for past key values.
     *
     * @param {Object} decoderFeeds The decoder feeds object to add past key values to.
     * @param {Object} pastKeyValues An object containing past key values.
     * @param {boolean} [hasDecoder=false] Whether the model has a decoder.
     */
    addPastKeyValues(decoderFeeds: any, pastKeyValues: any, hasDecoder?: boolean): void;
    /**
     * Initializes and returns the beam for text generation task
     * @param {Tensor} inputTokenIds The input token ids.
     * @param {number} numOutputTokens The number of tokens to be generated.
     * @param {Tensor} inputs_attention_mask Optional input attention mask.
     * @returns {any} A Beam object representing the initialized beam.
     * @private
     */
    private getStartBeams;
    /**
     * Runs a single step of the beam search generation algorithm.
     * @param {any} beam The current beam being generated.
     * @returns {Promise<any>} The updated beam after a single generation step.
     * @private
     */
    private runBeam;
    /**
     * Update a beam with a new token ID.
     * @param {Object} beam The beam to update.
     * @param {number} newTokenId The new token ID to add to the beam's output.
     * @private
     */
    private updateBeam;
}
export class ModelOutput {
}
/**
 * Base class for model's outputs, with potential hidden states and attentions.
 */
export class BaseModelOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.last_hidden_state Sequence of hidden-states at the output of the last layer of the model.
     * @param {Tensor} [output.hidden_states] Hidden-states of the model at the output of each layer plus the optional initial embedding outputs.
     * @param {Tensor} [output.attentions] Attentions weights after the attention softmax, used to compute the weighted average in the self-attention heads.
     */
    constructor({ last_hidden_state, hidden_states, attentions }: {
        last_hidden_state: Tensor;
        hidden_states?: Tensor;
        attentions?: Tensor;
    });
    last_hidden_state: Tensor;
    hidden_states: Tensor;
    attentions: Tensor;
}
export class BertPreTrainedModel extends PreTrainedModel {
}
export class BertModel extends BertPreTrainedModel {
}
/**
 * BertForMaskedLM is a class representing a BERT model for masked language modeling.
 * @extends BertPreTrainedModel
 */
export class BertForMaskedLM extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * BertForSequenceClassification is a class representing a BERT model for sequence classification.
 * @extends BertPreTrainedModel
 */
export class BertForSequenceClassification extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * BertForTokenClassification is a class representing a BERT model for token classification.
 * @extends BertPreTrainedModel
 */
export class BertForTokenClassification extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * BertForQuestionAnswering is a class representing a BERT model for question answering.
 * @extends BertPreTrainedModel
 */
export class BertForQuestionAnswering extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class CamembertPreTrainedModel extends PreTrainedModel {
}
/**
 * The bare CamemBERT Model transformer outputting raw hidden-states without any specific head on top.
 */
export class CamembertModel extends CamembertPreTrainedModel {
}
/**
 * CamemBERT Model with a `language modeling` head on top.
 */
export class CamembertForMaskedLM extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * CamemBERT Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output) e.g. for GLUE tasks.
 */
export class CamembertForSequenceClassification extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * CamemBERT Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.
 */
export class CamembertForTokenClassification extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * CamemBERT Model with a span classification head on top for extractive question-answering tasks
 */
export class CamembertForQuestionAnswering extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class DebertaPreTrainedModel extends PreTrainedModel {
}
/**
 * The bare DeBERTa Model transformer outputting raw hidden-states without any specific head on top.
 */
export class DebertaModel extends DebertaPreTrainedModel {
}
/**
 * DeBERTa Model with a `language modeling` head on top.
 */
export class DebertaForMaskedLM extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * DeBERTa Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)
 */
export class DebertaForSequenceClassification extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * DeBERTa Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.
 */
export class DebertaForTokenClassification extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * DeBERTa Model with a span classification head on top for extractive question-answering tasks like SQuAD (a linear
 * layers on top of the hidden-states output to compute `span start logits` and `span end logits`).
 */
export class DebertaForQuestionAnswering extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class DebertaV2PreTrainedModel extends PreTrainedModel {
}
/**
 * The bare DeBERTa-V2 Model transformer outputting raw hidden-states without any specific head on top.
 */
export class DebertaV2Model extends DebertaV2PreTrainedModel {
}
/**
 * DeBERTa-V2 Model with a `language modeling` head on top.
 */
export class DebertaV2ForMaskedLM extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * DeBERTa-V2 Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)
 */
export class DebertaV2ForSequenceClassification extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * DeBERTa-V2 Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.
 */
export class DebertaV2ForTokenClassification extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * DeBERTa-V2 Model with a span classification head on top for extractive question-answering tasks like SQuAD (a linear
 * layers on top of the hidden-states output to compute `span start logits` and `span end logits`).
 */
export class DebertaV2ForQuestionAnswering extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class DistilBertPreTrainedModel extends PreTrainedModel {
}
export class DistilBertModel extends DistilBertPreTrainedModel {
}
/**
 * DistilBertForSequenceClassification is a class representing a DistilBERT model for sequence classification.
 * @extends DistilBertPreTrainedModel
 */
export class DistilBertForSequenceClassification extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * DistilBertForTokenClassification is a class representing a DistilBERT model for token classification.
 * @extends DistilBertPreTrainedModel
 */
export class DistilBertForTokenClassification extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * DistilBertForQuestionAnswering is a class representing a DistilBERT model for question answering.
 * @extends DistilBertPreTrainedModel
 */
export class DistilBertForQuestionAnswering extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
/**
 * DistilBertForMaskedLM is a class representing a DistilBERT model for masking task.
 * @extends DistilBertPreTrainedModel
 */
export class DistilBertForMaskedLM extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
export class MobileBertPreTrainedModel extends PreTrainedModel {
}
export class MobileBertModel extends MobileBertPreTrainedModel {
}
/**
 * MobileBertForMaskedLM is a class representing a MobileBERT model for masking task.
 * @extends MobileBertPreTrainedModel
 */
export class MobileBertForMaskedLM extends MobileBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * @extends MobileBertPreTrainedModel
 */
export class MobileBertForSequenceClassification extends MobileBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * @extends MobileBertPreTrainedModel
 */
export class MobileBertForQuestionAnswering extends MobileBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class MPNetPreTrainedModel extends PreTrainedModel {
}
/**
 * The bare MPNet Model transformer outputting raw hidden-states without any specific head on top.
 * @extends MPNetPreTrainedModel
 */
export class MPNetModel extends MPNetPreTrainedModel {
}
/**
 * MPNetForMaskedLM is a class representing a MPNet model for masked language modeling.
 * @extends MPNetPreTrainedModel
 */
export class MPNetForMaskedLM extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * MPNetForSequenceClassification is a class representing a MPNet model for sequence classification.
 * @extends MPNetPreTrainedModel
 */
export class MPNetForSequenceClassification extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * MPNetForTokenClassification is a class representing a MPNet model for token classification.
 * @extends MPNetPreTrainedModel
 */
export class MPNetForTokenClassification extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * MPNetForQuestionAnswering is a class representing a MPNet model for question answering.
 * @extends MPNetPreTrainedModel
 */
export class MPNetForQuestionAnswering extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class SqueezeBertPreTrainedModel extends PreTrainedModel {
}
export class SqueezeBertModel extends SqueezeBertPreTrainedModel {
}
export class SqueezeBertForMaskedLM extends SqueezeBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
export class SqueezeBertForSequenceClassification extends SqueezeBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class SqueezeBertForQuestionAnswering extends SqueezeBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class AlbertPreTrainedModel extends PreTrainedModel {
}
export class AlbertModel extends AlbertPreTrainedModel {
}
export class AlbertForSequenceClassification extends AlbertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class AlbertForQuestionAnswering extends AlbertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class AlbertForMaskedLM extends AlbertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
export class T5PreTrainedModel extends PreTrainedModel {
}
export class T5Model extends T5PreTrainedModel {
}
/**
 * T5Model is a class representing a T5 model for conditional generation.
 * @extends T5PreTrainedModel
 */
export class T5ForConditionalGeneration extends T5PreTrainedModel {
    /**
     * Creates a new instance of the `T5ForConditionalGeneration` class.
     * @param {Object} config The model configuration.
     * @param {any} session session for the model.
     * @param {any} decoder_merged_session session for the decoder.
     * @param {GenerationConfig} generation_config The generation configuration.
     */
    constructor(config: any, session: any, decoder_merged_session: any, generation_config: GenerationConfig);
    decoder_merged_session: any;
    generation_config: GenerationConfig;
    num_decoder_layers: any;
    num_decoder_heads: any;
    decoder_dim_kv: any;
    num_encoder_layers: any;
    num_encoder_heads: any;
    encoder_dim_kv: any;
}
export class MT5PreTrainedModel extends PreTrainedModel {
}
export class MT5Model extends MT5PreTrainedModel {
}
/**
 * A class representing a conditional sequence-to-sequence model based on the MT5 architecture.
 *
 * @extends MT5PreTrainedModel
 */
export class MT5ForConditionalGeneration extends MT5PreTrainedModel {
    /**
     * Creates a new instance of the `MT5ForConditionalGeneration` class.
     * @param {any} config The model configuration.
     * @param {any} session The ONNX session containing the encoder weights.
     * @param {any} decoder_merged_session The ONNX session containing the merged decoder weights.
     * @param {GenerationConfig} generation_config The generation configuration.
     */
    constructor(config: any, session: any, decoder_merged_session: any, generation_config: GenerationConfig);
    decoder_merged_session: any;
    generation_config: GenerationConfig;
    num_decoder_layers: any;
    num_decoder_heads: any;
    decoder_dim_kv: any;
    num_encoder_layers: any;
    num_encoder_heads: any;
    encoder_dim_kv: any;
}
export class BartPretrainedModel extends PreTrainedModel {
}
/**
 * BART encoder and decoder model.
 *
 * @extends BartPretrainedModel
 */
export class BartModel extends BartPretrainedModel {
}
/**
 * BART model with a language model head for conditional generation.
 * @extends BartPretrainedModel
 */
export class BartForConditionalGeneration extends BartPretrainedModel {
    /**
     * Creates a new instance of the `BartForConditionalGeneration` class.
     * @param {Object} config The configuration object for the Bart model.
     * @param {Object} session The ONNX session used to execute the model.
     * @param {Object} decoder_merged_session The ONNX session used to execute the decoder.
     * @param {Object} generation_config The generation configuration object.
     */
    constructor(config: any, session: any, decoder_merged_session: any, generation_config: any);
    decoder_merged_session: any;
    generation_config: any;
    num_decoder_layers: any;
    num_decoder_heads: any;
    decoder_dim_kv: number;
    num_encoder_layers: any;
    num_encoder_heads: any;
    encoder_dim_kv: number;
}
export class BartForSequenceClassification extends BartPretrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class MBartPreTrainedModel extends PreTrainedModel {
}
/**
 * The bare MBART Model outputting raw hidden-states without any specific head on top.
 */
export class MBartModel extends MBartPreTrainedModel {
}
/**
 * The MBART Model with a language modeling head. Can be used for summarization, after fine-tuning the pretrained models.
 */
export class MBartForConditionalGeneration extends MBartPreTrainedModel {
    /**
     * Creates a new instance of the `MBartForConditionalGeneration` class.
     * @param {Object} config The configuration object for the Bart model.
     * @param {Object} session The ONNX session used to execute the model.
     * @param {Object} decoder_merged_session The ONNX session used to execute the decoder.
     * @param {Object} generation_config The generation configuration object.
     */
    constructor(config: any, session: any, decoder_merged_session: any, generation_config: any);
    decoder_merged_session: any;
    generation_config: any;
    num_decoder_layers: any;
    num_decoder_heads: any;
    decoder_dim_kv: number;
    num_encoder_layers: any;
    num_encoder_heads: any;
    encoder_dim_kv: number;
}
/**
 * MBart model with a sequence classification/head on top (a linear layer on top of the pooled output).
 */
export class MBartForSequenceClassification extends MBartPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class RobertaPreTrainedModel extends PreTrainedModel {
}
export class RobertaModel extends RobertaPreTrainedModel {
}
/**
 * RobertaForMaskedLM class for performing masked language modeling on Roberta models.
 * @extends RobertaPreTrainedModel
 */
export class RobertaForMaskedLM extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * RobertaForSequenceClassification class for performing sequence classification on Roberta models.
 * @extends RobertaPreTrainedModel
 */
export class RobertaForSequenceClassification extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * RobertaForTokenClassification class for performing token classification on Roberta models.
 * @extends RobertaPreTrainedModel
 */
export class RobertaForTokenClassification extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * RobertaForQuestionAnswering class for performing question answering on Roberta models.
 * @extends RobertaPreTrainedModel
 */
export class RobertaForQuestionAnswering extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
/**
 * An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.
 */
export class XLMPreTrainedModel extends PreTrainedModel {
}
/**
 * The bare XLM Model transformer outputting raw hidden-states without any specific head on top.
 */
export class XLMModel extends XLMPreTrainedModel {
}
/**
 * The XLM Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
export class XLMWithLMHeadModel extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * XLM Model with a sequence classification/regression head on top (a linear layer on top of the pooled output)
 */
export class XLMForSequenceClassification extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * XLM Model with a token classification head on top (a linear layer on top of the hidden-states output)
 */
export class XLMForTokenClassification extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * XLM Model with a span classification head on top for extractive question-answering tasks
 */
export class XLMForQuestionAnswering extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class XLMRobertaPreTrainedModel extends PreTrainedModel {
}
export class XLMRobertaModel extends XLMRobertaPreTrainedModel {
}
/**
 * XLMRobertaForMaskedLM class for performing masked language modeling on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
export class XLMRobertaForMaskedLM extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    _call(model_inputs: any): Promise<MaskedLMOutput>;
}
/**
 * XLMRobertaForSequenceClassification class for performing sequence classification on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
export class XLMRobertaForSequenceClassification extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * XLMRobertaForTokenClassification class for performing token classification on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
export class XLMRobertaForTokenClassification extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    _call(model_inputs: any): Promise<TokenClassifierOutput>;
}
/**
 * XLMRobertaForQuestionAnswering class for performing question answering on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
export class XLMRobertaForQuestionAnswering extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    _call(model_inputs: any): Promise<QuestionAnsweringModelOutput>;
}
export class WhisperPreTrainedModel extends PreTrainedModel {
}
/**
 * WhisperModel class for training Whisper models without a language model head.
 * @extends WhisperPreTrainedModel
 */
export class WhisperModel extends WhisperPreTrainedModel {
}
/**
 * WhisperForConditionalGeneration class for generating conditional outputs from Whisper models.
 * @extends WhisperPreTrainedModel
 */
export class WhisperForConditionalGeneration extends WhisperPreTrainedModel {
    /**
     * Creates a new instance of the `WhisperForConditionalGeneration` class.
     * @param {Object} config Configuration object for the model.
     * @param {Object} session ONNX Session object for the model.
     * @param {Object} decoder_merged_session ONNX Session object for the decoder.
     * @param {Object} generation_config Configuration object for the generation process.
     */
    constructor(config: any, session: any, decoder_merged_session: any, generation_config: any);
    requires_attention_mask: boolean;
    decoder_merged_session: any;
    generation_config: any;
    num_decoder_layers: any;
    num_decoder_heads: any;
    decoder_dim_kv: number;
    num_encoder_layers: any;
    num_encoder_heads: any;
    encoder_dim_kv: number;
    /**
     * @typedef {Object} WhisperGenerationConfig
     * @extends GenerationConfig
     * @property {boolean} [return_timestamps=null] Whether to return the timestamps with the text. This enables the `WhisperTimestampsLogitsProcessor`.
     * @property {boolean} [return_token_timestamps=null] Whether to return token-level timestamps
     * with the text. This can be used with or without the `return_timestamps` option. To get word-level
     * timestamps, use the tokenizer to group the tokens into words.
     * @property {number} [num_frames=null]  The number of audio frames available in this chunk. This is only used generating word-level timestamps.
     */
    /**
     * Generates outputs based on input and generation configuration.
     * @param {Object} inputs Input data for the model.
     * @param {WhisperGenerationConfig} generation_config Configuration object for the generation process.
     * @param {Object} logits_processor Optional logits processor object.
     * @returns {Promise<Object>} Promise object represents the generated outputs.
     */
    generate(inputs: any, generation_config?: any, logits_processor?: any): Promise<any>;
    /**
     * Calculates token-level timestamps using the encoder-decoder cross-attentions and
     * dynamic time-warping (DTW) to map each output token to a position in the input audio.
     * @param {Object} generate_outputs Outputs generated by the model
     * @param {Tensor[][][]} generate_outputs.cross_attentions The cross attentions output by the model
     * @param {Tensor[][][]} generate_outputs.decoder_attentions The decoder attentions output by the model
     * @param {number[][]} generate_outputs.sequences The sequences output by the model
     * @param {number[][]} alignment_heads Alignment heads of the model
     * @param {number} [num_frames=null] Number of frames in the input audio.
     * @param {number} [time_precision=0.02] Precision of the timestamps in seconds
     * @returns {Tensor} tensor containing the timestamps in seconds for each predicted token
     */
    _extract_token_timestamps(generate_outputs: {
        cross_attentions: Tensor[][][];
        decoder_attentions: Tensor[][][];
        sequences: number[][];
    }, alignment_heads: number[][], num_frames?: number, time_precision?: number): Tensor;
}
/**
 * Vision Encoder-Decoder model based on OpenAI's GPT architecture for image captioning and other vision tasks
 * @extends PreTrainedModel
 */
export class VisionEncoderDecoderModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `VisionEncoderDecoderModel` class.
     * @param {Object} config The configuration object specifying the hyperparameters and other model settings.
     * @param {Object} session The ONNX session containing the encoder model.
     * @param {any} decoder_merged_session The ONNX session containing the merged decoder model.
     */
    constructor(config: any, session: any, decoder_merged_session: any);
    add_decoder_pkv: boolean;
    decoder_merged_session: any;
    num_layers: any;
    num_heads: any;
    dim_kv: number;
}
export class CLIPPreTrainedModel extends PreTrainedModel {
}
/**
 * CLIP Text and Vision Model with a projection layers on top
 *
 * **Example:** Perform zero-shot image classification with a `CLIPModel`.
 *
 * ```javascript
 * import { AutoTokenizer, AutoProcessor, CLIPModel, RawImage } from '@xenova/transformers';
 *
 * // Load tokenizer, processor, and model
 * let tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch16');
 * let processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch16');
 * let model = await CLIPModel.from_pretrained('Xenova/clip-vit-base-patch16');
 *
 * // Run tokenization
 * let texts = ['a photo of a car', 'a photo of a football match']
 * let text_inputs = tokenizer(texts, { padding: true, truncation: true });
 *
 * // Read image and run processor
 * let image = await RawImage.read('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg');
 * let image_inputs = await processor(image);
 *
 * // Run model with both text and pixel inputs
 * let output = await model({ ...text_inputs, ...image_inputs });
 * // {
 * //   logits_per_image: Tensor {
 * //     dims: [ 1, 2 ],
 * //     data: Float32Array(2) [ 18.579734802246094, 24.31830596923828 ],
 * //   },
 * //   logits_per_text: Tensor {
 * //     dims: [ 2, 1 ],
 * //     data: Float32Array(2) [ 18.579734802246094, 24.31830596923828 ],
 * //   },
 * //   text_embeds: Tensor {
 * //     dims: [ 2, 512 ],
 * //     data: Float32Array(1024) [ ... ],
 * //   },
 * //   image_embeds: Tensor {
 * //     dims: [ 1, 512 ],
 * //     data: Float32Array(512) [ ... ],
 * //   }
 * // }
 * ```
 */
export class CLIPModel extends CLIPPreTrainedModel {
}
/**
 * CLIP Text Model with a projection layer on top (a linear layer on top of the pooled output)
 *
 * **Example:** Compute text embeddings with `CLIPTextModelWithProjection`.
 *
 * ```javascript
 * import { AutoTokenizer, CLIPTextModelWithProjection } from '@xenova/transformers';
 *
 * // Load tokenizer and text model
 * const tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch16');
 * const text_model = await CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16');
 *
 * // Run tokenization
 * let texts = ['a photo of a car', 'a photo of a football match'];
 * let text_inputs = tokenizer(texts, { padding: true, truncation: true });
 *
 * // Compute embeddings
 * const { text_embeds } = await text_model(text_inputs);
 * // Tensor {
 * //   dims: [ 2, 512 ],
 * //   type: 'float32',
 * //   data: Float32Array(1024) [ ... ],
 * //   size: 1024
 * // }
 * ```
 */
export class CLIPTextModelWithProjection extends CLIPPreTrainedModel {
}
/**
 * CLIP Vision Model with a projection layer on top (a linear layer on top of the pooled output)
 *
 * **Example:** Compute vision embeddings with `CLIPVisionModelWithProjection`.
 *
 * ```javascript
 * import { AutoProcessor, CLIPVisionModelWithProjection, RawImage} from '@xenova/transformers';
 *
 * // Load processor and vision model
 * const processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch16');
 * const vision_model = await CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16');
 *
 * // Read image and run processor
 * let image = await RawImage.read('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg');
 * let image_inputs = await processor(image);
 *
 * // Compute embeddings
 * const { image_embeds } = await vision_model(image_inputs);
 * // Tensor {
 * //   dims: [ 1, 512 ],
 * //   type: 'float32',
 * //   data: Float32Array(512) [ ... ],
 * //   size: 512
 * // }
 * ```
 */
export class CLIPVisionModelWithProjection extends CLIPPreTrainedModel {
}
export class GPT2PreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
export class GPT2Model extends GPT2PreTrainedModel {
}
/**
 * GPT-2 language model head on top of the GPT-2 base model. This model is suitable for text generation tasks.
 * @extends GPT2PreTrainedModel
 */
export class GPT2LMHeadModel extends GPT2PreTrainedModel {
}
export class GPTNeoPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
export class GPTNeoModel extends GPTNeoPreTrainedModel {
}
export class GPTNeoForCausalLM extends GPTNeoPreTrainedModel {
}
export class GPTNeoXPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
export class GPTNeoXModel extends GPTNeoXPreTrainedModel {
}
export class GPTNeoXForCausalLM extends GPTNeoXPreTrainedModel {
}
export class GPTJPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
export class GPTJModel extends GPTJPreTrainedModel {
}
export class GPTJForCausalLM extends GPTJPreTrainedModel {
}
export class GPTBigCodePreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
export class GPTBigCodeModel extends GPTBigCodePreTrainedModel {
}
export class GPTBigCodeForCausalLM extends GPTBigCodePreTrainedModel {
}
export class CodeGenPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
/**
 * CodeGenModel is a class representing a code generation model without a language model head.
 *
 * @extends CodeGenPreTrainedModel
 */
export class CodeGenModel extends CodeGenPreTrainedModel {
}
/**
 * CodeGenForCausalLM is a class that represents a code generation model based on the GPT-2 architecture. It extends the `CodeGenPreTrainedModel` class.
 * @extends CodeGenPreTrainedModel
 */
export class CodeGenForCausalLM extends CodeGenPreTrainedModel {
}
/**
 * The bare LLama Model outputting raw hidden-states without any specific head on top.
 */
export class LlamaPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
/**
 * The bare LLaMA Model outputting raw hidden-states without any specific head on top.
 */
export class LlamaModel extends LlamaPreTrainedModel {
}
export class LlamaForCausalLM extends LlamaPreTrainedModel {
}
/**
 * The Bloom Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
export class BloomPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
/**
 * The bare Bloom Model transformer outputting raw hidden-states without any specific head on top.
 */
export class BloomModel extends BloomPreTrainedModel {
}
/**
 * The Bloom Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
export class BloomForCausalLM extends BloomPreTrainedModel {
}
export class MptPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
/**
 * The bare Mpt Model transformer outputting raw hidden-states without any specific head on top.
 */
export class MptModel extends MptPreTrainedModel {
}
/**
 * The MPT Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
export class MptForCausalLM extends MptPreTrainedModel {
}
export class OPTPreTrainedModel extends PreTrainedModel {
    num_heads: any;
    num_layers: any;
    dim_kv: number;
}
/**
 * The bare OPT Model outputting raw hidden-states without any specific head on top.
 */
export class OPTModel extends OPTPreTrainedModel {
}
/**
 * The OPT Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
export class OPTForCausalLM extends OPTPreTrainedModel {
}
export class ViTPreTrainedModel extends PreTrainedModel {
}
export class ViTModel extends ViTPreTrainedModel {
}
export class ViTForImageClassification extends ViTPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class MobileViTPreTrainedModel extends PreTrainedModel {
}
export class MobileViTModel extends MobileViTPreTrainedModel {
}
export class MobileViTForImageClassification extends MobileViTPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class BeitPreTrainedModel extends PreTrainedModel {
}
export class BeitModel extends BeitPreTrainedModel {
}
export class BeitForImageClassification extends BeitPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class DetrPreTrainedModel extends PreTrainedModel {
}
export class DetrModel extends DetrPreTrainedModel {
}
export class DetrForObjectDetection extends DetrPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<DetrObjectDetectionOutput>;
}
export class DetrForSegmentation extends DetrPreTrainedModel {
    /**
     * Runs the model with the provided inputs
     * @param {Object} model_inputs Model inputs
     * @returns {Promise<DetrSegmentationOutput>} Object containing segmentation outputs
     */
    _call(model_inputs: any): Promise<DetrSegmentationOutput>;
}
export class DetrObjectDetectionOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Classification logits (including no-object) for all queries.
     * @param {Tensor} output.pred_boxes Normalized boxes coordinates for all queries, represented as (center_x, center_y, width, height).
     * These values are normalized in [0, 1], relative to the size of each individual image in the batch (disregarding possible padding).
     */
    constructor({ logits, pred_boxes }: {
        logits: Tensor;
        pred_boxes: Tensor;
    });
    logits: Tensor;
    pred_boxes: Tensor;
}
export class DetrSegmentationOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits The output logits of the model.
     * @param {Tensor} output.pred_boxes Predicted boxes.
     * @param {Tensor} output.pred_masks Predicted masks.
     */
    constructor({ logits, pred_boxes, pred_masks }: {
        logits: Tensor;
        pred_boxes: Tensor;
        pred_masks: Tensor;
    });
    logits: Tensor;
    pred_boxes: Tensor;
    pred_masks: Tensor;
}
export class DeiTPreTrainedModel extends PreTrainedModel {
}
export class DeiTModel extends DeiTPreTrainedModel {
}
export class DeiTForImageClassification extends DeiTPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.
 */
export class ResNetPreTrainedModel extends PreTrainedModel {
}
/**
 * The bare ResNet model outputting raw features without any specific head on top.
 */
export class ResNetModel extends ResNetPreTrainedModel {
}
/**
 * ResNet Model with an image classification head on top (a linear layer on top of the pooled features), e.g. for ImageNet.
 */
export class ResNetForImageClassification extends ResNetPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class SwinPreTrainedModel extends PreTrainedModel {
}
export class SwinModel extends SwinPreTrainedModel {
}
export class SwinForImageClassification extends SwinPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
export class YolosPreTrainedModel extends PreTrainedModel {
}
export class YolosModel extends YolosPreTrainedModel {
}
export class YolosForObjectDetection extends YolosPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    _call(model_inputs: any): Promise<YolosObjectDetectionOutput>;
}
export class YolosObjectDetectionOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Classification logits (including no-object) for all queries.
     * @param {Tensor} output.pred_boxes Normalized boxes coordinates for all queries, represented as (center_x, center_y, width, height).
     * These values are normalized in [0, 1], relative to the size of each individual image in the batch (disregarding possible padding).
     */
    constructor({ logits, pred_boxes }: {
        logits: Tensor;
        pred_boxes: Tensor;
    });
    logits: Tensor;
    pred_boxes: Tensor;
}
export class SamPreTrainedModel extends PreTrainedModel {
}
export class SamModel extends SamPreTrainedModel {
    /**
     * @param {Object} model_inputs
     * @param {Tensor} model_inputs.pixel_values Pixel values as a Tensor with shape `(batch_size, num_channels, height, width)`.
     * @param {Tensor} model_inputs.input_points Input 2D spatial points with shape `(batch_size, num_points, 2)`. This is used by the prompt encoder to encode the prompt.
     * @todo Add support for `input_labels`, `input_boxes`, `input_masks`, and `image_embeddings`.
     */
    _call(model_inputs: {
        pixel_values: Tensor;
        input_points: Tensor;
    }): Promise<SamImageSegmentationOutput>;
}
/**
 * Base class for Segment-Anything model's output.
 */
export class SamImageSegmentationOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.iou_scores The output logits of the model.
     * @param {Tensor} output.pred_masks Predicted boxes.
     */
    constructor({ iou_scores, pred_masks }: {
        iou_scores: Tensor;
        pred_masks: Tensor;
    });
    iou_scores: Tensor;
    pred_masks: Tensor;
}
export class MarianPreTrainedModel extends PreTrainedModel {
}
export class MarianModel extends MarianPreTrainedModel {
}
export class MarianMTModel extends MarianPreTrainedModel {
    /**
     * Creates a new instance of the `MarianMTModel` class.
    * @param {Object} config The model configuration object.
    * @param {Object} session The ONNX session object.
    * @param {any} decoder_merged_session
    * @param {any} generation_config
    */
    constructor(config: any, session: any, decoder_merged_session: any, generation_config: any);
    decoder_merged_session: any;
    generation_config: any;
    num_decoder_layers: any;
    num_decoder_heads: any;
    decoder_dim_kv: number;
    num_encoder_layers: any;
    num_encoder_heads: any;
    encoder_dim_kv: number;
    /**
     * @param {any} model_inputs
     * @returns {Promise<Seq2SeqLMOutput>}
     */
    forward(model_inputs: any): Promise<Seq2SeqLMOutput>;
}
export class M2M100PreTrainedModel extends PreTrainedModel {
}
export class M2M100Model extends M2M100PreTrainedModel {
}
export class M2M100ForConditionalGeneration extends M2M100PreTrainedModel {
    /**
     * Creates a new instance of the `M2M100ForConditionalGeneration` class.
    * @param {Object} config The model configuration object.
    * @param {Object} session The ONNX session object.
    * @param {any} decoder_merged_session
    * @param {any} generation_config
    */
    constructor(config: any, session: any, decoder_merged_session: any, generation_config: any);
    decoder_merged_session: any;
    generation_config: any;
    num_decoder_layers: any;
    num_decoder_heads: any;
    decoder_dim_kv: number;
    num_encoder_layers: any;
    num_encoder_heads: any;
    encoder_dim_kv: number;
    /**
     * @param {any} model_inputs
     * @returns {Promise<Seq2SeqLMOutput>}
     */
    forward(model_inputs: any): Promise<Seq2SeqLMOutput>;
}
export class Wav2Vec2PreTrainedModel extends PreTrainedModel {
}
/**
 * The bare Wav2Vec2 Model transformer outputting raw hidden-states without any specific head on top.
 *
 * **Example:** Load and run an `Wav2Vec2Model` for feature extraction.
 *
 * ```javascript
 * import { AutoProcessor, AutoModel, read_audio } from '@xenova/transformers';
 *
 * // Read and preprocess audio
 * const processor = await AutoProcessor.from_pretrained('Xenova/mms-300m');
 * const audio = await read_audio('https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/mlk.flac', 16000);
 * const inputs = await processor(audio);
 *
 * // Run model with inputs
 * const model = await AutoModel.from_pretrained('Xenova/mms-300m');
 * const output = await model(inputs);
 * // {
 * //   last_hidden_state: Tensor {
 * //     dims: [ 1, 1144, 1024 ],
 * //     type: 'float32',
 * //     data: Float32Array(1171456) [ ... ],
 * //     size: 1171456
 * //   }
 * // }
 * ```
 */
export class Wav2Vec2Model extends Wav2Vec2PreTrainedModel {
}
export class Wav2Vec2ForCTC extends Wav2Vec2PreTrainedModel {
    /**
     * @param {Object} model_inputs
     * @param {Tensor} model_inputs.input_values Float values of input raw speech waveform.
     * @param {Tensor} model_inputs.attention_mask Mask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]
     */
    _call(model_inputs: {
        input_values: Tensor;
        attention_mask: Tensor;
    }): Promise<CausalLMOutput>;
}
export class Wav2Vec2ForSequenceClassification extends Wav2Vec2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.
 */
export class WavLMPreTrainedModel extends PreTrainedModel {
}
/**
 * The bare WavLM Model transformer outputting raw hidden-states without any specific head on top.
 *
 * **Example:** Load and run an `WavLMModel` for feature extraction.
 *
 * ```javascript
 * import { AutoProcessor, AutoModel, read_audio } from '@xenova/transformers';
 *
 * // Read and preprocess audio
 * const processor = await AutoProcessor.from_pretrained('Xenova/wavlm-base');
 * const audio = await read_audio('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav', 16000);
 * const inputs = await processor(audio);
 *
 * // Run model with inputs
 * const model = await AutoModel.from_pretrained('Xenova/wavlm-base');
 * const output = await model(inputs);
 * // {
 * //   last_hidden_state: Tensor {
 * //     dims: [ 1, 549, 768 ],
 * //     type: 'float32',
 * //     data: Float32Array(421632) [-0.349443256855011, -0.39341306686401367,  0.022836603224277496, ...],
 * //     size: 421632
 * //   }
 * // }
 * ```
 */
export class WavLMModel extends WavLMPreTrainedModel {
}
/**
 * WavLM Model with a `language modeling` head on top for Connectionist Temporal Classification (CTC).
 */
export class WavLMForCTC extends WavLMPreTrainedModel {
    /**
     * @param {Object} model_inputs
     * @param {Tensor} model_inputs.input_values Float values of input raw speech waveform.
     * @param {Tensor} model_inputs.attention_mask Mask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]
     */
    _call(model_inputs: {
        input_values: Tensor;
        attention_mask: Tensor;
    }): Promise<CausalLMOutput>;
}
/**
 * WavLM Model with a sequence classification head on top (a linear layer over the pooled output).
 */
export class WavLMForSequenceClassification extends WavLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    _call(model_inputs: any): Promise<SequenceClassifierOutput>;
}
/**
 * Base class of all AutoModels. Contains the `from_pretrained` function
 * which is used to instantiate pretrained models.
 */
export class PretrainedMixin {
    /**
     * Mapping from model type to model class.
     * @type {Map<string, Object>[]}
     */
    static MODEL_CLASS_MAPPINGS: Map<string, any>[];
    /**
     * Whether to attempt to instantiate the base class (`PretrainedModel`) if
     * the model type is not found in the mapping.
     */
    static BASE_IF_FAIL: boolean;
    /**
     * Instantiate one of the model classes of the library from a pretrained model.
     *
     * The model class to instantiate is selected based on the `model_type` property of the config object
     * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
     *
     * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
     * - A string, the *model id* of a pretrained model hosted inside a model repo on huggingface.co.
     *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
     *   user or organization name, like `dbmdz/bert-base-german-cased`.
     * - A path to a *directory* containing model weights, e.g., `./my_model_directory/`.
     * @param {PretrainedOptions} options Additional options for loading the model.
     *
     * @returns {Promise<PreTrainedModel>} A new instance of the `PreTrainedModel` class.
     */
    static from_pretrained(pretrained_model_name_or_path: string, { quantized, progress_callback, config, cache_dir, local_files_only, revision, model_file_name, }?: import("./utils/hub.js").PretrainedOptions): Promise<PreTrainedModel>;
}
/**
 * Helper class which is used to instantiate pretrained models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModel.from_pretrained('bert-base-uncased');
 */
export class AutoModel extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof BertModel>[];
}
/**
 * Helper class which is used to instantiate pretrained sequence classification models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForSequenceClassification.from_pretrained('distilbert-base-uncased-finetuned-sst-2-english');
 */
export class AutoModelForSequenceClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof BertForSequenceClassification>[];
}
/**
 * Helper class which is used to instantiate pretrained token classification models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForTokenClassification.from_pretrained('Davlan/distilbert-base-multilingual-cased-ner-hrl');
 */
export class AutoModelForTokenClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof BertForTokenClassification>[];
}
/**
 * Helper class which is used to instantiate pretrained sequence-to-sequence models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForSeq2SeqLM.from_pretrained('t5-small');
 */
export class AutoModelForSeq2SeqLM extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof T5ForConditionalGeneration>[];
}
/**
 * Helper class which is used to instantiate pretrained causal language models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForCausalLM.from_pretrained('gpt2');
 */
export class AutoModelForCausalLM extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof BloomForCausalLM>[];
}
/**
 * Helper class which is used to instantiate pretrained masked language models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForMaskedLM.from_pretrained('bert-base-uncased');
 */
export class AutoModelForMaskedLM extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof BertForMaskedLM>[];
}
/**
 * Helper class which is used to instantiate pretrained question answering models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForQuestionAnswering.from_pretrained('distilbert-base-cased-distilled-squad');
 */
export class AutoModelForQuestionAnswering extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof BertForQuestionAnswering>[];
}
/**
 * Helper class which is used to instantiate pretrained vision-to-sequence models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForVision2Seq.from_pretrained('nlpconnect/vit-gpt2-image-captioning');
 */
export class AutoModelForVision2Seq extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof VisionEncoderDecoderModel>[];
}
/**
 * Helper class which is used to instantiate pretrained image classification models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForImageClassification.from_pretrained('google/vit-base-patch16-224');
 */
export class AutoModelForImageClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof ViTForImageClassification>[];
}
/**
 * Helper class which is used to instantiate pretrained image segmentation models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForImageSegmentation.from_pretrained('facebook/detr-resnet-50-panoptic');
 */
export class AutoModelForImageSegmentation extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof DetrForSegmentation>[];
}
/**
 * Helper class which is used to instantiate pretrained object detection models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForObjectDetection.from_pretrained('facebook/detr-resnet-50');
 */
export class AutoModelForObjectDetection extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof DetrForObjectDetection>[];
}
/**
 * Helper class which is used to instantiate pretrained object detection models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 *
 * @example
 * let model = await AutoModelForMaskGeneration.from_pretrained('Xenova/sam-vit-base');
 */
export class AutoModelForMaskGeneration extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof SamModel>[];
}
export class AutoModelForCTC extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof Wav2Vec2ForCTC>[];
}
export class AutoModelForAudioClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS: Map<string, typeof Wav2Vec2ForSequenceClassification>[];
}
export class Seq2SeqLMOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits The output logits of the model.
     * @param {Tensor} output.past_key_values An tensor of key/value pairs that represent the previous state of the model.
     * @param {Tensor} output.encoder_outputs The output of the encoder in a sequence-to-sequence model.
     * @param {Tensor} [output.decoder_attentions] Attentions weights of the decoder, after the attention softmax, used to compute the weighted average in the self-attention heads.
     * @param {Tensor} [output.cross_attentions] Attentions weights of the decoder's cross-attention layer, after the attention softmax, used to compute the weighted average in the cross-attention heads.
     */
    constructor({ logits, past_key_values, encoder_outputs, decoder_attentions, cross_attentions }: {
        logits: Tensor;
        past_key_values: Tensor;
        encoder_outputs: Tensor;
        decoder_attentions?: Tensor;
        cross_attentions?: Tensor;
    });
    logits: Tensor;
    past_key_values: Tensor;
    encoder_outputs: Tensor;
    decoder_attentions: Tensor;
    cross_attentions: Tensor;
}
/**
 * Base class for outputs of sentence classification models.
 */
export class SequenceClassifierOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits classification (or regression if config.num_labels==1) scores (before SoftMax).
     */
    constructor({ logits }: {
        logits: Tensor;
    });
    logits: Tensor;
}
/**
 * Base class for outputs of token classification models.
 */
export class TokenClassifierOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Classification scores (before SoftMax).
     */
    constructor({ logits }: {
        logits: Tensor;
    });
    logits: Tensor;
}
/**
 * Base class for masked language models outputs.
 */
export class MaskedLMOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Prediction scores of the language modeling head (scores for each vocabulary token before SoftMax).
     */
    constructor({ logits }: {
        logits: Tensor;
    });
    logits: Tensor;
}
/**
 * Base class for outputs of question answering models.
 */
export class QuestionAnsweringModelOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.start_logits Span-start scores (before SoftMax).
     * @param {Tensor} output.end_logits Span-end scores (before SoftMax).
     */
    constructor({ start_logits, end_logits }: {
        start_logits: Tensor;
        end_logits: Tensor;
    });
    start_logits: Tensor;
    end_logits: Tensor;
}
/**
 * Base class for causal language model (or autoregressive) outputs.
 */
export class CausalLMOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Prediction scores of the language modeling head (scores for each vocabulary token before softmax).
     */
    constructor({ logits }: {
        logits: Tensor;
    });
    logits: Tensor;
}
/**
 * Base class for causal language model (or autoregressive) outputs.
 */
export class CausalLMOutputWithPast extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Prediction scores of the language modeling head (scores for each vocabulary token before softmax).
     * @param {Tensor} output.past_key_values Contains pre-computed hidden-states (key and values in the self-attention blocks)
     * that can be used (see `past_key_values` input) to speed up sequential decoding.
     */
    constructor({ logits, past_key_values }: {
        logits: Tensor;
        past_key_values: Tensor;
    });
    logits: Tensor;
    past_key_values: Tensor;
}
export type PretrainedOptions = import('./utils/hub.js').PretrainedOptions;
/**
 * Runs a single step of the text generation process for a given beam.
 *
 * @param {Object} self The decoder object.
 * @param {Object} beam The beam to run.
 * @param {Tensor} beam.input The input tensor.
 * @param {Tensor} beam.model_input_ids The input ids to the model.
 * @param {Tensor} beam.attention_mask The attention mask.
 * @param {Object} beam.prev_model_outputs The past key values.
 * @param {number[]} beam.output_token_ids The output token ids.
 * @returns {Promise<Object>} The output of the generation step.
 * @private
 */
declare function decoderRunBeam(self: any, beam: {
    input: Tensor;
    model_input_ids: Tensor;
    attention_mask: Tensor;
    prev_model_outputs: any;
    output_token_ids: number[];
}): Promise<any>;
/**
 * Starts the generation of text by initializing the beams for the given input token IDs.
 * @param {Object} self The text generation model object.
 * @param {any} inputTokenIds An array of input token IDs to generate text from.
 * @param {number} numOutputTokens The maximum number of tokens to generate for each beam.
 * @param {Tensor} [inputs_attention_mask] The attention mask tensor for the input token IDs.
 * @returns {Object[]} An array of beams initialized with the given inputs and parameters.
 * @private
 */
declare function decoderStartBeams(self: any, inputTokenIds: any, numOutputTokens: number, inputs_attention_mask?: Tensor): any[];
/**
 * Update a beam with a new token ID.
 * @param {Object} beam The beam to update.
 * @param {number} newTokenId The new token ID to add to the beam's output.
 * @private
 */
declare function decoderUpdatebeam(beam: any, newTokenId: number): void;
/**
 * Forward pass of an encoder model.
 * @param {Object} self The encoder model.
 * @param {Object} model_inputs The input data to be used for the forward pass.
 * @returns {Promise<Object>} Promise that resolves with an object containing the model's outputs.
 * @private
 */
declare function encoderForward(self: any, model_inputs: any): Promise<any>;
import { GenerationConfig } from './utils/generation.js';
import { Tensor } from './utils/tensor.js';
export {};
//# sourceMappingURL=models.d.ts.map