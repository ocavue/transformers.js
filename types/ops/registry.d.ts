export class TensorOpRegistry {
    static session_options: {};
    static get bilinear_interpolate_4d(): Promise<(inputs: any) => Promise<Tensor>>;
    static get bicubic_interpolate_4d(): Promise<(inputs: any) => Promise<Tensor>>;
    static get matmul(): Promise<(inputs: any) => Promise<Tensor>>;
}
import { Tensor } from "../utils/tensor.js";
//# sourceMappingURL=registry.d.ts.map