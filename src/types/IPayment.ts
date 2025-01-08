export interface IPayment {
    paymentId: number;
    amount: number;
    account: string;
    paymentMethodId: IPaymentMethod;
}

interface IPaymentMethod {
    paymentMethodId: number;
    paymentMethod: string;
}