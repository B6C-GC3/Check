export interface KeyAndValue<K, V> {
    key: K | undefined;
    value: V | undefined;
}

export interface KeyAndValueDefault<V> {
    key: React.Key | undefined;
    value: V | undefined;
}