export interface ProductFeature {
    // Marker interface
}

export class ReturnPolicyFeature implements ProductFeature {
    constructor(public readonly daysToReturn: number) { }
}

export class ShippingFeature implements ProductFeature {
    constructor(public readonly price: number) { }
}

export class SubscriptionFeature implements ProductFeature {
    constructor(public readonly durationDays: number) { }
}

export class DownloadFeature implements ProductFeature {
    constructor(public readonly url: string) { }
}
