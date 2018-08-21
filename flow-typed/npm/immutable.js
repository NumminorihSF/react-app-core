declare module 'immutable' {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  /**
   * This file provides type definitions for use with the Flow type checker.
   *
   * An important caveat when using these definitions is that the types for
   * `Collection.Keyed`, `Collection.Indexed`, `Seq.Keyed`, and so on are stubs.
   * When referring to those types, you can get the proper definitions by
   * importing the types `KeyedCollection`, `IndexedCollection`, `KeyedSeq`, etc.
   * For example,
   *
   *     import { Seq } from 'immutable'
   *     import type { IndexedCollection, IndexedSeq } from 'immutable'
   *
   *     const someSeq: IndexedSeq<number> = Seq.Indexed.of(1, 2, 3)
   *
   *     function takesASeq<T, TS: IndexedCollection<T>>(iter: TS): TS {
   *       return iter.butLast()
   *     }
   *
   *     takesASeq(someSeq)
   *
   * @flow
   */

  // Helper type that represents plain objects allowed as arguments to
  // some constructors and functions.
  declare type PlainObjInput<K, V> = { [key: K]: V, __proto__: null };

  // Helper types to extract the "keys" and "values" use by the *In() methods.
  declare type $KeyOf<C> = $Call<
    (<K>(?_Collection<K, mixed>) => K) &
      (<T>(?$ReadOnlyArray<T>) => number) &
      (<T>(?RecordInstance<T> | T) => $Keys<T>),
    C,
  >;

  declare type $ValOf<C, K = $KeyOf<C>> = $Call<
    (<V>(?_Collection<any, V>) => V) &
      (<T>(?$ReadOnlyArray<T>) => T) &
      (<T, K: $Keys<T>>(?RecordInstance<T> | T, K) => $ElementType<T, K>) &
      (<V>(?{ [any]: V }) => V),
    C,
    K,
  >;

  declare type $IterableOf<C> = $Call<
    (<V: Array<any> | IndexedCollection<any> | SetCollection<any>>(V) => Iterable<$ValOf<V>>) &
      (<V: KeyedCollection<any, any> | RecordInstance<any> | PlainObjInput<any, any>>(
        V,
      ) => Iterable<[$KeyOf<V>, $ValOf<V>]>),
    C,
  >;

  declare class _Collection<K, +V> /* implements ValueObject */ {
    equals(other: mixed): boolean;
    hashCode(): number;
    get(key: K, ..._: []): V | void;
    get<NSV>(key: K, notSetValue: NSV): V | NSV;
    has(key: K): boolean;
    includes(value: V): boolean;
    contains(value: V): boolean;
    first(): V | void;
    last(): V | void;

    hasIn(keyPath: Iterable<mixed>): boolean;

    getIn(keyPath: [], notSetValue?: mixed): this;
    getIn<NSV>(keyPath: [K], notSetValue: NSV): V | NSV;
    getIn<NSV, K2: $KeyOf<V>>(keyPath: [K, K2], notSetValue: NSV): $ValOf<V, K2> | NSV;
    getIn<NSV, K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>>(
      keyPath: [K, K2, K3],
      notSetValue: NSV,
    ): $ValOf<$ValOf<V, K2>, K3> | NSV;
    getIn<NSV, K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>, K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>>(
      keyPath: [K, K2, K3, K4],
      notSetValue: NSV,
    ): $ValOf<$ValOf<$ValOf<V, K2>, K3>, K4> | NSV;
    getIn<
      NSV,
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      notSetValue: NSV,
    ): $ValOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>, K5> | NSV;

    update<U>(updater: (value: this) => U): U;

    toJS(): Array<any> | { [key: string]: mixed };
    toJSON(): Array<V> | { [key: string]: V };
    toArray(): Array<V> | Array<[K, V]>;
    toObject(): { [key: string]: V };
    toMap(): Map<K, V>;
    toOrderedMap(): OrderedMap<K, V>;
    toSet(): Set<V>;
    toOrderedSet(): OrderedSet<V>;
    toList(): List<V>;
    toStack(): Stack<V>;
    toSeq(): Seq<K, V>;
    toKeyedSeq(): KeyedSeq<K, V>;
    toIndexedSeq(): IndexedSeq<V>;
    toSetSeq(): SetSeq<V>;

    keys(): Iterator<K>;
    values(): Iterator<V>;
    entries(): Iterator<[K, V]>;

    keySeq(): IndexedSeq<K>;
    valueSeq(): IndexedSeq<V>;
    entrySeq(): IndexedSeq<[K, V]>;

    reverse(): this;
    sort(comparator?: (valueA: V, valueB: V) => number): this;

    sortBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number,
    ): this;

    groupBy<G>(grouper: (value: V, key: K, iter: this) => G, context?: mixed): KeyedSeq<G, this>;

    forEach(sideEffect: (value: V, key: K, iter: this) => any, context?: mixed): number;

    slice(begin?: number, end?: number): this;
    rest(): this;
    butLast(): this;
    skip(amount: number): this;
    skipLast(amount: number): this;
    skipWhile(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): this;
    skipUntil(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): this;
    take(amount: number): this;
    takeLast(amount: number): this;
    takeWhile(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): this;
    takeUntil(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): this;

    filterNot(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): this;

    reduce<R>(reducer: (reduction: R, value: V, key: K, iter: this) => R, initialReduction: R, context?: mixed): R;
    reduce<R>(reducer: (reduction: V | R, value: V, key: K, iter: this) => R): R;

    reduceRight<R>(reducer: (reduction: R, value: V, key: K, iter: this) => R, initialReduction: R, context?: mixed): R;
    reduceRight<R>(reducer: (reduction: V | R, value: V, key: K, iter: this) => R): R;

    every(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): boolean;
    some(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): boolean;
    join(separator?: string): string;
    isEmpty(): boolean;
    count(predicate?: (value: V, key: K, iter: this) => mixed, context?: mixed): number;
    countBy<G>(grouper: (value: V, key: K, iter: this) => G, context?: mixed): Map<G, number>;

    find<NSV>(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed, notSetValue?: NSV): V | NSV;
    findLast<NSV>(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed, notSetValue?: NSV): V | NSV;

    findEntry(predicate: (value: V, key: K, iter: this) => mixed): [K, V] | void;
    findLastEntry(predicate: (value: V, key: K, iter: this) => mixed): [K, V] | void;

    findKey(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): K | void;
    findLastKey(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): K | void;

    keyOf(searchValue: V): K | void;
    lastKeyOf(searchValue: V): K | void;

    max(comparator?: (valueA: V, valueB: V) => number): V;
    maxBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number,
    ): V;
    min(comparator?: (valueA: V, valueB: V) => number): V;
    minBy<C>(
      comparatorValueMapper: (value: V, key: K, iter: this) => C,
      comparator?: (valueA: C, valueB: C) => number,
    ): V;

    isSubset(iter: Iterable<V>): boolean;
    isSuperset(iter: Iterable<V>): boolean;
  }

  declare export function isImmutable(maybeImmutable: mixed): boolean %checks(maybeImmutable instanceof Collection);
  declare function isCollection(maybeCollection: mixed): boolean %checks(maybeCollection instanceof Collection);
  declare function isKeyed(maybeKeyed: mixed): boolean %checks(maybeKeyed instanceof KeyedCollection);
  declare function isIndexed(maybeIndexed: mixed): boolean %checks(maybeIndexed instanceof IndexedCollection);
  declare function isAssociative(maybeAssociative: mixed): boolean %checks(maybeAssociative instanceof
    KeyedCollection || maybeAssociative instanceof IndexedCollection);
  declare function isOrdered(maybeOrdered: mixed): boolean %checks(maybeOrdered instanceof IndexedCollection ||
    maybeOrdered instanceof OrderedMap ||
    maybeOrdered instanceof OrderedSet);
  declare function isValueObject(maybeValue: mixed): boolean;

  declare export interface ValueObject {
    equals(other: mixed): boolean;
    hashCode(): number;
  }

  declare export class Collection<K, +V> extends _Collection<K, V> {
    static Keyed: typeof KeyedCollection;
    static Indexed: typeof IndexedCollection;
    static Set: typeof SetCollection;

    static isCollection: typeof isCollection;
    static isKeyed: typeof isKeyed;
    static isIndexed: typeof isIndexed;
    static isAssociative: typeof isAssociative;
    static isOrdered: typeof isOrdered;
  }

  declare export class KeyedCollection<K, +V> extends Collection<K, V> {
    static <K, V>(values?: Iterable<[K, V]> | PlainObjInput<K, V>): KeyedCollection<K, V>;

    toJS(): { [key: string]: mixed };
    toJSON(): { [key: string]: V };
    toArray(): Array<[K, V]>;
    @@iterator(): Iterator<[K, V]>;
    toSeq(): KeyedSeq<K, V>;
    flip(): KeyedCollection<V, K>;

    concat<KC, VC>(...iters: Array<Iterable<[KC, VC]> | PlainObjInput<KC, VC>>): KeyedCollection<K | KC, V | VC>;

    filter(predicate: typeof Boolean): KeyedCollection<K, $NonMaybeType<V>>;
    filter(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): KeyedCollection<K, V>;

    map<M>(mapper: (value: V, key: K, iter: this) => M, context?: mixed): KeyedCollection<K, M>;

    mapKeys<M>(mapper: (key: K, value: V, iter: this) => M, context?: mixed): KeyedCollection<M, V>;

    mapEntries<KM, VM>(
      mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
      context?: mixed,
    ): KeyedCollection<KM, VM>;

    flatMap<KM, VM>(
      mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
      context?: mixed,
    ): KeyedCollection<KM, VM>;

    flatten(depth?: number): KeyedCollection<any, any>;
    flatten(shallow?: boolean): KeyedCollection<any, any>;
  }

  declare export class IndexedCollection<+T> extends Collection<number, T> {
    static <T>(iter?: Iterable<T>): IndexedCollection<T>;

    toJS(): Array<mixed>;
    toJSON(): Array<T>;
    toArray(): Array<T>;
    @@iterator(): Iterator<T>;
    toSeq(): IndexedSeq<T>;
    fromEntrySeq<K, V>(): KeyedSeq<K, V>;
    interpose(separator: T): this;
    interleave(...collections: Iterable<T>[]): this;
    splice(index: number, removeNum: number, ...values: T[]): this;

    zip<A>(a: Iterable<A>, ..._: []): IndexedCollection<[T, A]>;
    zip<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): IndexedCollection<[T, A, B]>;
    zip<A, B, C>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, ..._: []): IndexedCollection<[T, A, B, C]>;
    zip<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): IndexedCollection<[T, A, B, C, D]>;
    zip<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): IndexedCollection<[T, A, B, C, D, E]>;

    zipAll<A>(a: Iterable<A>, ..._: []): IndexedCollection<[T | void, A | void]>;
    zipAll<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): IndexedCollection<[T | void, A | void, B | void]>;
    zipAll<A, B, C>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): IndexedCollection<[T | void, A | void, B | void, C | void]>;
    zipAll<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): IndexedCollection<[T | void, A | void, B | void, C | void, D | void]>;
    zipAll<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): IndexedCollection<[T | void, A | void, B | void, C | void, D | void, E | void]>;

    zipWith<A, R>(zipper: (value: T, a: A) => R, a: Iterable<A>, ..._: []): IndexedCollection<R>;
    zipWith<A, B, R>(
      zipper: (value: T, a: A, b: B) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      ..._: []
    ): IndexedCollection<R>;
    zipWith<A, B, C, R>(
      zipper: (value: T, a: A, b: B, c: C) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): IndexedCollection<R>;
    zipWith<A, B, C, D, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): IndexedCollection<R>;
    zipWith<A, B, C, D, E, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D, e: E) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): IndexedCollection<R>;

    indexOf(searchValue: T): number;
    lastIndexOf(searchValue: T): number;
    findIndex(predicate: (value: T, index: number, iter: this) => mixed, context?: mixed): number;
    findLastIndex(predicate: (value: T, index: number, iter: this) => mixed, context?: mixed): number;

    concat<C>(...iters: Array<Iterable<C> | C>): IndexedCollection<T | C>;

    filter(predicate: typeof Boolean): IndexedCollection<$NonMaybeType<T>>;
    filter(predicate: (value: T, index: number, iter: this) => mixed, context?: mixed): IndexedCollection<T>;

    map<M>(mapper: (value: T, index: number, iter: this) => M, context?: mixed): IndexedCollection<M>;

    flatMap<M>(mapper: (value: T, index: number, iter: this) => Iterable<M>, context?: mixed): IndexedCollection<M>;

    flatten(depth?: number): IndexedCollection<any>;
    flatten(shallow?: boolean): IndexedCollection<any>;
  }

  declare export class SetCollection<+T> extends Collection<T, T> {
    static <T>(iter?: Iterable<T>): SetCollection<T>;

    toJS(): Array<mixed>;
    toJSON(): Array<T>;
    toArray(): Array<T>;
    @@iterator(): Iterator<T>;
    toSeq(): SetSeq<T>;

    concat<U>(...collections: Iterable<U>[]): SetCollection<T | U>;

    // `filter`, `map` and `flatMap` cannot be defined further up the hierarchy,
    // because the implementation for `KeyedCollection` allows the value type to
    // change without constraining the key type. That does not work for
    // `SetCollection` - the value and key types *must* match.
    filter(predicate: typeof Boolean): SetCollection<$NonMaybeType<T>>;
    filter(predicate: (value: T, value: T, iter: this) => mixed, context?: mixed): SetCollection<T>;

    map<M>(mapper: (value: T, value: T, iter: this) => M, context?: mixed): SetCollection<M>;

    flatMap<M>(mapper: (value: T, value: T, iter: this) => Iterable<M>, context?: mixed): SetCollection<M>;

    flatten(depth?: number): SetCollection<any>;
    flatten(shallow?: boolean): SetCollection<any>;
  }

  declare function isSeq(maybeSeq: mixed): boolean %checks(maybeSeq instanceof Seq);
  declare export class Seq<K, +V> extends _Collection<K, V> {
    static Keyed: typeof KeyedSeq;
    static Indexed: typeof IndexedSeq;
    static Set: typeof SetSeq;

    static <K, V>(values: KeyedSeq<K, V>): KeyedSeq<K, V>;
    static <T>(values: SetSeq<T>): SetSeq<K, V>;
    static <T>(values: Iterable<T>): IndexedSeq<T>;
    static <K, V>(values?: PlainObjInput<K, V>): KeyedSeq<K, V>;

    static isSeq: typeof isSeq;

    size: number | void;
    cacheResult(): this;
    toSeq(): this;
  }

  declare export class KeyedSeq<K, +V> extends Seq<K, V> mixins KeyedCollection<K, V> {
    static <K, V>(values?: Iterable<[K, V]> | PlainObjInput<K, V>): KeyedSeq<K, V>;

    // Override specialized return types
    flip(): KeyedSeq<V, K>;

    concat<KC, VC>(...iters: Array<Iterable<[KC, VC]> | PlainObjInput<KC, VC>>): KeyedSeq<K | KC, V | VC>;

    filter(predicate: typeof Boolean): KeyedSeq<K, $NonMaybeType<V>>;
    filter(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): KeyedSeq<K, V>;

    map<M>(mapper: (value: V, key: K, iter: this) => M, context?: mixed): KeyedSeq<K, M>;

    mapKeys<M>(mapper: (key: K, value: V, iter: this) => M, context?: mixed): KeyedSeq<M, V>;

    mapEntries<KM, VM>(
      mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
      context?: mixed,
    ): KeyedSeq<KM, VM>;

    flatMap<KM, VM>(mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>, context?: mixed): KeyedSeq<KM, VM>;

    flatten(depth?: number): KeyedSeq<any, any>;
    flatten(shallow?: boolean): KeyedSeq<any, any>;
  }

  declare export class IndexedSeq<+T> extends Seq<number, T> mixins IndexedCollection<T> {
    static <T>(values?: Iterable<T>): IndexedSeq<T>;

    static of<T>(...values: T[]): IndexedSeq<T>;

    // Override specialized return types

    concat<C>(...iters: Array<Iterable<C> | C>): IndexedSeq<T | C>;

    filter(predicate: typeof Boolean): IndexedSeq<$NonMaybeType<T>>;
    filter(predicate: (value: T, index: number, iter: this) => mixed, context?: mixed): IndexedSeq<T>;

    map<M>(mapper: (value: T, index: number, iter: this) => M, context?: mixed): IndexedSeq<M>;

    flatMap<M>(mapper: (value: T, index: number, iter: this) => Iterable<M>, context?: mixed): IndexedSeq<M>;

    flatten(depth?: number): IndexedSeq<any>;
    flatten(shallow?: boolean): IndexedSeq<any>;

    zip<A>(a: Iterable<A>, ..._: []): IndexedSeq<[T, A]>;
    zip<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): IndexedSeq<[T, A, B]>;
    zip<A, B, C>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, ..._: []): IndexedSeq<[T, A, B, C]>;
    zip<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): IndexedSeq<[T, A, B, C, D]>;
    zip<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): IndexedSeq<[T, A, B, C, D, E]>;

    zipAll<A>(a: Iterable<A>, ..._: []): IndexedSeq<[T | void, A | void]>;
    zipAll<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): IndexedSeq<[T | void, A | void, B | void]>;
    zipAll<A, B, C>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): IndexedSeq<[T | void, A | void, B | void, C | void]>;
    zipAll<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): IndexedSeq<[T | void, A | void, B | void, C | void, D | void]>;
    zipAll<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): IndexedSeq<[T | void, A | void, B | void, C | void, D | void, E | void]>;

    zipWith<A, R>(zipper: (value: T, a: A) => R, a: Iterable<A>, ..._: []): IndexedSeq<R>;
    zipWith<A, B, R>(zipper: (value: T, a: A, b: B) => R, a: Iterable<A>, b: Iterable<B>, ..._: []): IndexedSeq<R>;
    zipWith<A, B, C, R>(
      zipper: (value: T, a: A, b: B, c: C) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): IndexedSeq<R>;
    zipWith<A, B, C, D, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): IndexedSeq<R>;
    zipWith<A, B, C, D, E, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D, e: E) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): IndexedSeq<R>;
  }

  declare export class SetSeq<+T> extends Seq<T, T> mixins SetCollection<T> {
    static <T>(values?: Iterable<T>): SetSeq<T>;

    static of<T>(...values: T[]): SetSeq<T>;

    // Override specialized return types

    concat<U>(...collections: Iterable<U>[]): SetSeq<T | U>;

    filter(predicate: typeof Boolean): SetSeq<$NonMaybeType<T>>;
    filter(predicate: (value: T, value: T, iter: this) => mixed, context?: mixed): SetSeq<T>;

    map<M>(mapper: (value: T, value: T, iter: this) => M, context?: mixed): SetSeq<M>;

    flatMap<M>(mapper: (value: T, value: T, iter: this) => Iterable<M>, context?: mixed): SetSeq<M>;

    flatten(depth?: number): SetSeq<any>;
    flatten(shallow?: boolean): SetSeq<any>;
  }

  declare class UpdatableInCollection<K, +V> {
    setIn<S>(keyPath: [], value: S): S;
    setIn(keyPath: [K], value: V): this;
    setIn<K2: $KeyOf<V>, S: $ValOf<V, K2>>(keyPath: [K, K2], value: S): this;
    setIn<K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>, S: $ValOf<$ValOf<V, K2>, K3>>(keyPath: [K, K2, K3], value: S): this;
    setIn<
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      S: $ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>,
    >(
      keyPath: [K, K2, K3, K4],
      value: S,
    ): this;
    setIn<
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>, K5>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      value: S,
    ): this;

    deleteIn(keyPath: []): void;
    deleteIn(keyPath: [K]): this;
    deleteIn<K2: $KeyOf<V>>(keyPath: [K, K2]): this;
    deleteIn<K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>>(keyPath: [K, K2, K3]): this;
    deleteIn<K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>, K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>>(
      keyPath: [K, K2, K3, K4],
    ): this;
    deleteIn<
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>>,
    >(
      keyPath: [K, K2, K3, K4, K5],
    ): this;

    removeIn(keyPath: []): void;
    removeIn(keyPath: [K]): this;
    removeIn<K2: $KeyOf<V>>(keyPath: [K, K2]): this;
    removeIn<K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>>(keyPath: [K, K2, K3]): this;
    removeIn<K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>, K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>>(
      keyPath: [K, K2, K3, K4],
    ): this;
    removeIn<
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>>,
    >(
      keyPath: [K, K2, K3, K4, K5],
    ): this;

    updateIn<U>(keyPath: [], notSetValue: mixed, updater: (value: this) => U): U;
    updateIn<U>(keyPath: [], updater: (value: this) => U): U;
    updateIn<NSV>(keyPath: [K], notSetValue: NSV, updater: (value: V) => V): this;
    updateIn(keyPath: [K], updater: (value: V) => V): this;
    updateIn<NSV, K2: $KeyOf<V>, S: $ValOf<V, K2>>(
      keyPath: [K, K2],
      notSetValue: NSV,
      updater: (value: $ValOf<V, K2> | NSV) => S,
    ): this;
    updateIn<K2: $KeyOf<V>, S: $ValOf<V, K2>>(keyPath: [K, K2], updater: (value: $ValOf<V, K2>) => S): this;
    updateIn<NSV, K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>, S: $ValOf<$ValOf<V, K2>, K3>>(
      keyPath: [K, K2, K3],
      notSetValue: NSV,
      updater: (value: $ValOf<$ValOf<V, K2>, K3> | NSV) => S,
    ): this;
    updateIn<K2: $KeyOf<V>, K3: $KeyOf<$ValOf<V, K2>>, S: $ValOf<$ValOf<V, K2>, K3>>(
      keyPath: [K, K2, K3],
      updater: (value: $ValOf<$ValOf<V, K2>, K3>) => S,
    ): this;
    updateIn<
      NSV,
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      S: $ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>,
    >(
      keyPath: [K, K2, K3, K4],
      notSetValue: NSV,
      updater: (value: $ValOf<$ValOf<$ValOf<V, K2>, K3>, K4> | NSV) => S,
    ): this;
    updateIn<
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      S: $ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>,
    >(
      keyPath: [K, K2, K3, K4],
      updater: (value: $ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>) => S,
    ): this;
    updateIn<
      NSV,
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>, K5>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      notSetValue: NSV,
      updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>, K5> | NSV) => S,
    ): this;
    updateIn<
      K2: $KeyOf<V>,
      K3: $KeyOf<$ValOf<V, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<V, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>, K5>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<V, K2>, K3>, K4>, K5>) => S,
    ): this;
  }

  declare function isList(maybeList: mixed): boolean %checks(maybeList instanceof List);
  declare export class List<+T> extends IndexedCollection<T> mixins UpdatableInCollection<number, T> {
    static (collection?: Iterable<T>): List<T>;

    static of<T>(...values: T[]): List<T>;

    static isList: typeof isList;

    size: number;

    set<U>(index: number, value: U): List<T | U>;
    delete(index: number): this;
    remove(index: number): this;
    insert<U>(index: number, value: U): List<T | U>;
    clear(): this;
    push<U>(...values: U[]): List<T | U>;
    pop(): this;
    unshift<U>(...values: U[]): List<T | U>;
    shift(): this;

    update<U>(updater: (value: this) => U): U;
    update<U>(index: number, updater: (value: T) => U): List<T | U>;
    update<U>(index: number, notSetValue: U, updater: (value: T) => U): List<T | U>;

    merge<U>(...collections: Iterable<U>[]): List<T | U>;

    setSize(size: number): this;

    mergeIn(keyPath: Iterable<mixed>, ...collections: Iterable<mixed>[]): this;
    mergeDeepIn(keyPath: Iterable<mixed>, ...collections: Iterable<mixed>[]): this;

    withMutations(mutator: (mutable: this) => mixed): this;
    asMutable(): this;
    wasAltered(): boolean;
    asImmutable(): this;

    // Override specialized return types

    concat<C>(...iters: Array<Iterable<C> | C>): List<T | C>;

    filter(predicate: typeof Boolean): List<$NonMaybeType<T>>;
    filter(predicate: (value: T, index: number, iter: this) => mixed, context?: mixed): List<T>;

    map<M>(mapper: (value: T, index: number, iter: this) => M, context?: mixed): List<M>;

    flatMap<M>(mapper: (value: T, index: number, iter: this) => Iterable<M>, context?: mixed): List<M>;

    flatten(depth?: number): List<any>;
    flatten(shallow?: boolean): List<any>;

    zip<A>(a: Iterable<A>, ..._: []): List<[T, A]>;
    zip<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): List<[T, A, B]>;
    zip<A, B, C>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, ..._: []): List<[T, A, B, C]>;
    zip<A, B, C, D>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>, ..._: []): List<[T, A, B, C, D]>;
    zip<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): List<[T, A, B, C, D, E]>;

    zipAll<A>(a: Iterable<A>, ..._: []): List<[T | void, A | void]>;
    zipAll<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): List<[T | void, A | void, B | void]>;
    zipAll<A, B, C>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): List<[T | void, A | void, B | void, C | void]>;
    zipAll<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): List<[T | void, A | void, B | void, C | void, D | void]>;
    zipAll<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): List<[T | void, A | void, B | void, C | void, D | void, E | void]>;

    zipWith<A, R>(zipper: (value: T, a: A) => R, a: Iterable<A>, ..._: []): List<R>;
    zipWith<A, B, R>(zipper: (value: T, a: A, b: B) => R, a: Iterable<A>, b: Iterable<B>, ..._: []): List<R>;
    zipWith<A, B, C, R>(
      zipper: (value: T, a: A, b: B, c: C) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): List<R>;
    zipWith<A, B, C, D, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): List<R>;
    zipWith<A, B, C, D, E, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D, e: E) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): List<R>;
  }

  declare function isMap(maybeMap: mixed): boolean %checks(maybeMap instanceof Map);
  declare export class Map<K, +V> extends KeyedCollection<K, V> mixins UpdatableInCollection<K, V> {
    static <K, V>(values?: Iterable<[K, V]> | PlainObjInput<K, V>): Map<K, V>;

    static isMap: typeof isMap;

    size: number;

    set<K_, V_>(key: K_, value: V_): Map<K | K_, V | V_>;
    delete(key: K): this;
    remove(key: K): this;
    clear(): this;

    deleteAll(keys: Iterable<K>): Map<K, V>;
    removeAll(keys: Iterable<K>): Map<K, V>;

    update<U>(updater: (value: this) => U): U;
    update<V_>(key: K, updater: (value: V) => V_): Map<K, V | V_>;
    update<V_>(key: K, notSetValue: V_, updater: (value: V) => V_): Map<K, V | V_>;

    merge<K_, V_>(...collections: (Iterable<[K_, V_]> | PlainObjInput<K_, V_>)[]): Map<K | K_, V | V_>;
    concat<K_, V_>(...collections: (Iterable<[K_, V_]> | PlainObjInput<K_, V_>)[]): Map<K | K_, V | V_>;

    mergeWith<K_, W, X>(
      merger: (oldVal: V, newVal: W, key: K) => X,
      ...collections: (Iterable<[K_, W]> | PlainObjInput<K_, W>)[]
    ): Map<K | K_, V | W | X>;

    mergeDeep<K_, V_>(...collections: (Iterable<[K_, V_]> | PlainObjInput<K_, V_>)[]): Map<K | K_, V | V_>;

    mergeDeepWith<K_, W, X>(
      merger: (oldVal: V, newVal: W, key: K) => X,
      ...collections: (Iterable<[K_, W]> | PlainObjInput<K_, W>)[]
    ): Map<K | K_, V | W | X>;

    mergeIn(keyPath: Iterable<mixed>, ...collections: (Iterable<mixed> | PlainObjInput<mixed, mixed>)[]): this;
    mergeDeepIn(keyPath: Iterable<mixed>, ...collections: (Iterable<mixed> | PlainObjInput<mixed, mixed>)[]): this;

    withMutations(mutator: (mutable: this) => mixed): this;
    asMutable(): this;
    wasAltered(): boolean;
    asImmutable(): this;

    // Override specialized return types

    flip(): Map<V, K>;

    filter(predicate: typeof Boolean): Map<K, $NonMaybeType<V>>;
    filter(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): Map<K, V>;

    map<M>(mapper: (value: V, key: K, iter: this) => M, context?: mixed): Map<K, M>;

    mapKeys<M>(mapper: (key: K, value: V, iter: this) => M, context?: mixed): Map<M, V>;

    mapEntries<KM, VM>(mapper: (entry: [K, V], index: number, iter: this) => [KM, VM], context?: mixed): Map<KM, VM>;

    flatMap<KM, VM>(mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>, context?: mixed): Map<KM, VM>;

    flatten(depth?: number): Map<any, any>;
    flatten(shallow?: boolean): Map<any, any>;
  }

  declare function isOrderedMap(maybeOrderedMap: mixed): boolean %checks(maybeOrderedMap instanceof OrderedMap);
  declare export class OrderedMap<K, +V> extends Map<K, V> mixins UpdatableInCollection<K, V> {
    static <K, V>(values?: Iterable<[K, V]> | PlainObjInput<K, V>): OrderedMap<K, V>;

    static isOrderedMap: typeof isOrderedMap;

    size: number;

    set<K_, V_>(key: K_, value: V_): OrderedMap<K | K_, V | V_>;
    delete(key: K): this;
    remove(key: K): this;
    clear(): this;

    update<U>(updater: (value: this) => U): U;
    update<V_>(key: K, updater: (value: V) => V_): OrderedMap<K, V | V_>;
    update<V_>(key: K, notSetValue: V_, updater: (value: V) => V_): OrderedMap<K, V | V_>;

    merge<K_, V_>(...collections: (Iterable<[K_, V_]> | PlainObjInput<K_, V_>)[]): OrderedMap<K | K_, V | V_>;
    concat<K_, V_>(...collections: (Iterable<[K_, V_]> | PlainObjInput<K_, V_>)[]): OrderedMap<K | K_, V | V_>;

    mergeWith<K_, W, X>(
      merger: (oldVal: V, newVal: W, key: K) => X,
      ...collections: (Iterable<[K_, W]> | PlainObjInput<K_, W>)[]
    ): OrderedMap<K | K_, V | W | X>;

    mergeDeep<K_, V_>(...collections: (Iterable<[K_, V_]> | PlainObjInput<K_, V_>)[]): OrderedMap<K | K_, V | V_>;

    mergeDeepWith<K_, W, X>(
      merger: (oldVal: V, newVal: W, key: K) => X,
      ...collections: (Iterable<[K_, W]> | PlainObjInput<K_, W>)[]
    ): OrderedMap<K | K_, V | W | X>;

    mergeIn(keyPath: Iterable<mixed>, ...collections: (Iterable<mixed> | PlainObjInput<mixed, mixed>)[]): this;
    mergeDeepIn(keyPath: Iterable<mixed>, ...collections: (Iterable<mixed> | PlainObjInput<mixed, mixed>)[]): this;

    withMutations(mutator: (mutable: this) => mixed): this;
    asMutable(): this;
    wasAltered(): boolean;
    asImmutable(): this;

    // Override specialized return types

    flip(): OrderedMap<V, K>;

    filter(predicate: typeof Boolean): OrderedMap<K, $NonMaybeType<V>>;
    filter(predicate: (value: V, key: K, iter: this) => mixed, context?: mixed): OrderedMap<K, V>;

    map<M>(mapper: (value: V, key: K, iter: this) => M, context?: mixed): OrderedMap<K, M>;

    mapKeys<M>(mapper: (key: K, value: V, iter: this) => M, context?: mixed): OrderedMap<M, V>;

    mapEntries<KM, VM>(
      mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
      context?: mixed,
    ): OrderedMap<KM, VM>;

    flatMap<KM, VM>(mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>, context?: mixed): OrderedMap<KM, VM>;

    flatten(depth?: number): OrderedMap<any, any>;
    flatten(shallow?: boolean): OrderedMap<any, any>;
  }

  declare function isSet(maybeSet: mixed): boolean %checks(maybeSet instanceof Set);
  declare export class Set<+T> extends SetCollection<T> {
    static <T>(values?: Iterable<T>): Set<T>;

    static of<T>(...values: T[]): Set<T>;
    static fromKeys<T>(values: Iterable<[T, mixed]> | PlainObjInput<T, mixed>): Set<T>;

    static intersect(sets: Iterable<Iterable<T>>): Set<T>;
    static union(sets: Iterable<Iterable<T>>): Set<T>;

    static isSet: typeof isSet;

    size: number;

    add<U>(value: U): Set<T | U>;
    delete(value: T): this;
    remove(value: T): this;
    clear(): this;
    union<U>(...collections: Iterable<U>[]): Set<T | U>;
    merge<U>(...collections: Iterable<U>[]): Set<T | U>;
    concat<U>(...collections: Iterable<U>[]): Set<T | U>;
    intersect<U>(...collections: Iterable<U>[]): Set<T & U>;
    subtract(...collections: Iterable<mixed>[]): this;

    withMutations(mutator: (mutable: this) => mixed): this;
    asMutable(): this;
    wasAltered(): boolean;
    asImmutable(): this;

    // Override specialized return types

    filter(predicate: typeof Boolean): Set<$NonMaybeType<T>>;
    filter(predicate: (value: T, value: T, iter: this) => mixed, context?: mixed): Set<T>;

    map<M>(mapper: (value: T, value: T, iter: this) => M, context?: mixed): Set<M>;

    flatMap<M>(mapper: (value: T, value: T, iter: this) => Iterable<M>, context?: mixed): Set<M>;

    flatten(depth?: number): Set<any>;
    flatten(shallow?: boolean): Set<any>;
  }

  // Overrides except for `isOrderedSet` are for specialized return types
  declare function isOrderedSet(maybeOrderedSet: mixed): boolean %checks(maybeOrderedSet instanceof OrderedSet);
  declare export class OrderedSet<+T> extends Set<T> {
    static <T>(values?: Iterable<T>): OrderedSet<T>;

    static of<T>(...values: T[]): OrderedSet<T>;
    static fromKeys<T>(values: Iterable<[T, mixed]> | PlainObjInput<T, mixed>): OrderedSet<T>;

    static isOrderedSet: typeof isOrderedSet;

    size: number;

    add<U>(value: U): OrderedSet<T | U>;
    union<U>(...collections: Iterable<U>[]): OrderedSet<T | U>;
    merge<U>(...collections: Iterable<U>[]): OrderedSet<T | U>;
    concat<U>(...collections: Iterable<U>[]): OrderedSet<T | U>;
    intersect<U>(...collections: Iterable<U>[]): OrderedSet<T & U>;

    filter(predicate: typeof Boolean): OrderedSet<$NonMaybeType<T>>;
    filter(predicate: (value: T, value: T, iter: this) => mixed, context?: mixed): OrderedSet<T>;

    map<M>(mapper: (value: T, value: T, iter: this) => M, context?: mixed): OrderedSet<M>;

    flatMap<M>(mapper: (value: T, value: T, iter: this) => Iterable<M>, context?: mixed): OrderedSet<M>;

    flatten(depth?: number): OrderedSet<any>;
    flatten(shallow?: boolean): OrderedSet<any>;

    zip<A>(a: Iterable<A>, ..._: []): OrderedSet<[T, A]>;
    zip<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): OrderedSet<[T, A, B]>;
    zip<A, B, C>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, ..._: []): OrderedSet<[T, A, B, C]>;
    zip<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): OrderedSet<[T, A, B, C, D]>;
    zip<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): OrderedSet<[T, A, B, C, D, E]>;

    zipAll<A>(a: Iterable<A>, ..._: []): OrderedSet<[T | void, A | void]>;
    zipAll<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): OrderedSet<[T | void, A | void, B | void]>;
    zipAll<A, B, C>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): OrderedSet<[T | void, A | void, B | void, C | void]>;
    zipAll<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): OrderedSet<[T | void, A | void, B | void, C | void, D | void]>;
    zipAll<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): OrderedSet<[T | void, A | void, B | void, C | void, D | void, E | void]>;

    zipWith<A, R>(zipper: (value: T, a: A) => R, a: Iterable<A>, ..._: []): OrderedSet<R>;
    zipWith<A, B, R>(zipper: (value: T, a: A, b: B) => R, a: Iterable<A>, b: Iterable<B>, ..._: []): OrderedSet<R>;
    zipWith<A, B, C, R>(
      zipper: (value: T, a: A, b: B, c: C) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): OrderedSet<R>;
    zipWith<A, B, C, D, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): OrderedSet<R>;
    zipWith<A, B, C, D, E, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D, e: E) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): OrderedSet<R>;
  }

  declare function isStack(maybeStack: mixed): boolean %checks(maybeStack instanceof Stack);
  declare export class Stack<+T> extends IndexedCollection<T> {
    static <T>(collection?: Iterable<T>): Stack<T>;

    static isStack(maybeStack: mixed): boolean;
    static of<T>(...values: T[]): Stack<T>;

    static isStack: typeof isStack;

    size: number;

    peek(): T;
    clear(): this;
    unshift<U>(...values: U[]): Stack<T | U>;
    unshiftAll<U>(iter: Iterable<U>): Stack<T | U>;
    shift(): this;
    push<U>(...values: U[]): Stack<T | U>;
    pushAll<U>(iter: Iterable<U>): Stack<T | U>;
    pop(): this;

    withMutations(mutator: (mutable: this) => mixed): this;
    asMutable(): this;
    wasAltered(): boolean;
    asImmutable(): this;

    // Override specialized return types

    concat<C>(...iters: Array<Iterable<C> | C>): Stack<T | C>;

    filter(predicate: typeof Boolean): Stack<$NonMaybeType<T>>;
    filter(predicate: (value: T, index: number, iter: this) => mixed, context?: mixed): Stack<T>;

    map<M>(mapper: (value: T, index: number, iter: this) => M, context?: mixed): Stack<M>;

    flatMap<M>(mapper: (value: T, index: number, iter: this) => Iterable<M>, context?: mixed): Stack<M>;

    flatten(depth?: number): Stack<any>;
    flatten(shallow?: boolean): Stack<any>;

    zip<A>(a: Iterable<A>, ..._: []): Stack<[T, A]>;
    zip<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): Stack<[T, A, B]>;
    zip<A, B, C>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, ..._: []): Stack<[T, A, B, C]>;
    zip<A, B, C, D>(a: Iterable<A>, b: Iterable<B>, c: Iterable<C>, d: Iterable<D>, ..._: []): Stack<[T, A, B, C, D]>;
    zip<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): Stack<[T, A, B, C, D, E]>;

    zipAll<A>(a: Iterable<A>, ..._: []): Stack<[T | void, A | void]>;
    zipAll<A, B>(a: Iterable<A>, b: Iterable<B>, ..._: []): Stack<[T | void, A | void, B | void]>;
    zipAll<A, B, C>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): Stack<[T | void, A | void, B | void, C | void]>;
    zipAll<A, B, C, D>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): Stack<[T | void, A | void, B | void, C | void, D | void]>;
    zipAll<A, B, C, D, E>(
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): Stack<[T | void, A | void, B | void, C | void, D | void, E | void]>;

    zipWith<A, R>(zipper: (value: T, a: A) => R, a: Iterable<A>, ..._: []): Stack<R>;
    zipWith<A, B, R>(zipper: (value: T, a: A, b: B) => R, a: Iterable<A>, b: Iterable<B>, ..._: []): Stack<R>;
    zipWith<A, B, C, R>(
      zipper: (value: T, a: A, b: B, c: C) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      ..._: []
    ): Stack<R>;
    zipWith<A, B, C, D, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      ..._: []
    ): Stack<R>;
    zipWith<A, B, C, D, E, R>(
      zipper: (value: T, a: A, b: B, c: C, d: D, e: E) => R,
      a: Iterable<A>,
      b: Iterable<B>,
      c: Iterable<C>,
      d: Iterable<D>,
      e: Iterable<E>,
      ..._: []
    ): Stack<R>;
  }

  declare function Range(start?: number, end?: number, step?: number): IndexedSeq<number>;
  declare function Repeat<T>(value: T, times?: number): IndexedSeq<T>;

  // The type of a Record factory function.
  declare export type RecordFactory<Values: Object> = Class<RecordInstance<Values>>;

  // The type of runtime Record instances.
  declare export type RecordOf<Values: Object> = RecordInstance<Values> & Values;

  // The values of a Record instance.
  declare type _RecordValues<T, R: RecordInstance<T> | T> = R;
  declare type RecordValues<R> = _RecordValues<*, R>;

  declare function isRecord(maybeRecord: any): boolean %checks(maybeRecord instanceof RecordInstance);
  declare export class Record {
    static <Values: Object>(spec: Values, name?: string): RecordFactory<Values>;
    constructor<Values: Object>(spec: Values, name?: string): RecordFactory<Values>;

    static isRecord: typeof isRecord;

    static getDescriptiveName(record: RecordInstance<any>): string;
  }

  declare export class RecordInstance<T: Object> {
    static (values?: Iterable<[$Keys<T>, $ValOf<T>]> | $Shape<T>): RecordOf<T>;
    // Note: a constructor can only create an instance of RecordInstance<T>,
    // it's encouraged to not use `new` when creating Records.
    constructor(values?: Iterable<[$Keys<T>, $ValOf<T>]> | $Shape<T>): void;

    size: number;

    has(key: string): boolean;
    get<K: $Keys<T>>(key: K, notSetValue: mixed): $ElementType<T, K>;

    hasIn(keyPath: Iterable<mixed>): boolean;

    getIn(keyPath: [], notSetValue?: mixed): this & T;
    getIn<K: $Keys<T>>(keyPath: [K], notSetValue?: mixed): $ElementType<T, K>;
    getIn<NSV, K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>>(
      keyPath: [K, K2],
      notSetValue: NSV,
    ): $ValOf<$ValOf<T, K>, K2> | NSV;
    getIn<NSV, K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>, K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>>(
      keyPath: [K, K2, K3],
      notSetValue: NSV,
    ): $ValOf<$ValOf<$ValOf<T, K>, K2>, K3> | NSV;
    getIn<
      NSV,
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
    >(
      keyPath: [K, K2, K3, K4],
      notSetValue: NSV,
    ): $ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4> | NSV;
    getIn<
      NSV,
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      notSetValue: NSV,
    ): $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>, K5> | NSV;

    equals(other: any): boolean;
    hashCode(): number;

    set<K: $Keys<T>>(key: K, value: $ElementType<T, K>): this & T;
    update<K: $Keys<T>>(key: K, updater: (value: $ElementType<T, K>) => $ElementType<T, K>): this & T;
    merge(...collections: Array<Iterable<[$Keys<T>, $ValOf<T>]> | $Shape<T>>): this & T;
    mergeDeep(...collections: Array<Iterable<[$Keys<T>, $ValOf<T>]> | $Shape<T>>): this & T;

    mergeWith(
      merger: (oldVal: $ValOf<T>, newVal: $ValOf<T>, key: $Keys<T>) => $ValOf<T>,
      ...collections: Array<Iterable<[$Keys<T>, $ValOf<T>]> | $Shape<T>>
    ): this & T;
    mergeDeepWith(
      merger: (oldVal: any, newVal: any, key: any) => any,
      ...collections: Array<Iterable<[$Keys<T>, $ValOf<T>]> | $Shape<T>>
    ): this & T;

    delete<K: $Keys<T>>(key: K): this & T;
    remove<K: $Keys<T>>(key: K): this & T;
    clear(): this & T;

    setIn<S>(keyPath: [], value: S): S;
    setIn<K: $Keys<T>, S: $ValOf<T, K>>(keyPath: [K], value: S): this & T;
    setIn<K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>, S: $ValOf<$ValOf<T, K>, K2>>(keyPath: [K, K2], value: S): this & T;
    setIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      S: $ValOf<$ValOf<$ValOf<T, K>, K2>, K3>,
    >(
      keyPath: [K, K2, K3],
      value: S,
    ): this & T;
    setIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>,
    >(
      keyPath: [K, K2, K3, K4],
      value: S,
    ): this & T;
    setIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>, K5>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      value: S,
    ): this & T;

    deleteIn(keyPath: []): void;
    deleteIn<K: $Keys<T>>(keyPath: [K]): this & T;
    deleteIn<K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>>(keyPath: [K, K2]): this & T;
    deleteIn<K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>, K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>>(
      keyPath: [K, K2, K3],
    ): this & T;
    deleteIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
    >(
      keyPath: [K, K2, K3, K4],
    ): this & T;
    deleteIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>>,
    >(
      keyPath: [K, K2, K3, K4, K5],
    ): this & T;

    removeIn(keyPath: []): void;
    removeIn<K: $Keys<T>>(keyPath: [K]): this & T;
    removeIn<K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>>(keyPath: [K, K2]): this & T;
    removeIn<K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>, K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>>(
      keyPath: [K, K2, K3],
    ): this & T;
    removeIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
    >(
      keyPath: [K, K2, K3, K4],
    ): this & T;
    removeIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>>,
    >(
      keyPath: [K, K2, K3, K4, K5],
    ): this & T;

    updateIn<U>(keyPath: [], notSetValue: mixed, updater: (value: this) => U): U;
    updateIn<U>(keyPath: [], updater: (value: this) => U): U;
    updateIn<NSV, K: $Keys<T>, S: $ValOf<T, K>>(
      keyPath: [K],
      notSetValue: NSV,
      updater: (value: $ValOf<T, K>) => S,
    ): this & T;
    updateIn<K: $Keys<T>, S: $ValOf<T, K>>(keyPath: [K], updater: (value: $ValOf<T, K>) => S): this & T;
    updateIn<NSV, K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>, S: $ValOf<$ValOf<T, K>, K2>>(
      keyPath: [K, K2],
      notSetValue: NSV,
      updater: (value: $ValOf<$ValOf<T, K>, K2> | NSV) => S,
    ): this & T;
    updateIn<K: $Keys<T>, K2: $KeyOf<$ValOf<T, K>>, S: $ValOf<$ValOf<T, K>, K2>>(
      keyPath: [K, K2],
      updater: (value: $ValOf<$ValOf<T, K>, K2>) => S,
    ): this & T;
    updateIn<
      NSV,
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      S: $ValOf<$ValOf<$ValOf<T, K>, K2>, K3>,
    >(
      keyPath: [K, K2, K3],
      notSetValue: NSV,
      updater: (value: $ValOf<$ValOf<$ValOf<T, K>, K2>, K3> | NSV) => S,
    ): this & T;
    updateIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      S: $ValOf<$ValOf<$ValOf<T, K>, K2>, K3>,
    >(
      keyPath: [K, K2, K3],
      updater: (value: $ValOf<$ValOf<$ValOf<T, K>, K2>, K3>) => S,
    ): this & T;
    updateIn<
      NSV,
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>,
    >(
      keyPath: [K, K2, K3, K4],
      notSetValue: NSV,
      updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4> | NSV) => S,
    ): this & T;
    updateIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>,
    >(
      keyPath: [K, K2, K3, K4],
      updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>) => S,
    ): this & T;
    updateIn<
      NSV,
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>, K5>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      notSetValue: NSV,
      updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>, K5> | NSV) => S,
    ): this & T;
    updateIn<
      K: $Keys<T>,
      K2: $KeyOf<$ValOf<T, K>>,
      K3: $KeyOf<$ValOf<$ValOf<T, K>, K2>>,
      K4: $KeyOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>>,
      K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>>,
      S: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>, K5>,
    >(
      keyPath: [K, K2, K3, K4, K5],
      updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<T, K>, K2>, K3>, K4>, K5>) => S,
    ): this & T;

    mergeIn(keyPath: Iterable<mixed>, ...collections: Array<any>): this & T;
    mergeDeepIn(keyPath: Iterable<mixed>, ...collections: Array<any>): this & T;

    toSeq(): KeyedSeq<$Keys<T>, any>;

    toJS(): { [key: $Keys<T>]: mixed };
    toJSON(): T;
    toObject(): T;

    withMutations(mutator: (mutable: this) => mixed): this & T;
    asMutable(): this & T;
    wasAltered(): boolean;
    asImmutable(): this & T;

    @@iterator(): Iterator<[$Keys<T>, $ValOf<T>]>;
  }

  declare export function fromJS(
    jsValue: mixed,
    reviver?: (
      key: string | number,
      sequence: KeyedCollection<string, mixed> | IndexedCollection<mixed>,
      path?: Array<string | number>,
    ) => mixed,
  ): any;

  declare export function is(first: mixed, second: mixed): boolean;
  declare export function hash(value: mixed): number;

  declare export function get<C: Object, K: $Keys<C>>(collection: C, key: K, notSetValue: mixed): $ValOf<C, K>;
  declare export function get<C, K: $KeyOf<C>, NSV>(collection: C, key: K, notSetValue: NSV): $ValOf<C, K> | NSV;

  declare export function has(collection: Object, key: mixed): boolean;
  declare export function remove<C>(collection: C, key: $KeyOf<C>): C;
  declare export function set<C, K: $KeyOf<C>, V: $ValOf<C, K>>(collection: C, key: K, value: V): C;
  declare export function update<C, K: $KeyOf<C>, V: $ValOf<C, K>, NSV>(
    collection: C,
    key: K,
    notSetValue: NSV,
    updater: ($ValOf<C, K> | NSV) => V,
  ): C;
  declare export function update<C, K: $KeyOf<C>, V: $ValOf<C, K>>(
    collection: C,
    key: K,
    updater: ($ValOf<C, K>) => V,
  ): C;

  declare export function getIn<C>(collection: C, keyPath: [], notSetValue?: mixed): C;
  declare export function getIn<C, K: $KeyOf<C>, NSV>(
    collection: C,
    keyPath: [K],
    notSetValue: NSV,
  ): $ValOf<C, K> | NSV;
  declare export function getIn<C, K: $KeyOf<C>, K2: $KeyOf<$ValOf<C, K>>, NSV>(
    collection: C,
    keyPath: [K, K2],
    notSetValue: NSV,
  ): $ValOf<$ValOf<C, K>, K2> | NSV;
  declare export function getIn<C, K: $KeyOf<C>, K2: $KeyOf<$ValOf<C, K>>, K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>, NSV>(
    collection: C,
    keyPath: [K, K2, K3],
    notSetValue: NSV,
  ): $ValOf<$ValOf<$ValOf<C, K>, K2>, K3> | NSV;
  declare export function getIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    NSV,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4],
    notSetValue: NSV,
  ): $ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4> | NSV;
  declare export function getIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>>,
    NSV,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4, K5],
    notSetValue: NSV,
  ): $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>, K5> | NSV;

  declare export function hasIn(collection: Object, keyPath: Iterable<mixed>): boolean;

  declare export function removeIn<C>(collection: C, keyPath: []): void;
  declare export function removeIn<C, K: $KeyOf<C>>(collection: C, keyPath: [K]): C;
  declare export function removeIn<C, K: $KeyOf<C>, K2: $KeyOf<$ValOf<C>>>(collection: C, keyPath: [K, K2]): C;
  declare export function removeIn<C, K: $KeyOf<C>, K2: $KeyOf<$ValOf<C>>, K3: $KeyOf<$ValOf<$ValOf<C>, K2>>>(
    collection: C,
    keyPath: [K, K2, K3],
  ): C;
  declare export function removeIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C>>,
    K3: $KeyOf<$ValOf<$ValOf<C>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C>, K2>, K3>>,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4],
  ): C;
  declare export function removeIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C>>,
    K3: $KeyOf<$ValOf<$ValOf<C>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C>, K2>, K3>>,
    K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<C>, K2>, K3>, K4>>,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4, K5],
  ): C;

  declare export function setIn<S>(collection: Object, keyPath: [], value: S): S;
  declare export function setIn<C, K: $KeyOf<C>, S: $ValOf<C, K>>(collection: C, keyPath: [K], value: S): C;
  declare export function setIn<C, K: $KeyOf<C>, K2: $KeyOf<$ValOf<C, K>>, S: $ValOf<$ValOf<C, K>, K2>>(
    collection: C,
    keyPath: [K, K2],
    value: S,
  ): C;
  declare export function setIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    S: $ValOf<$ValOf<$ValOf<C, K>, K2>, K3>,
  >(
    collection: C,
    keyPath: [K, K2, K3],
    value: S,
  ): C;
  declare export function setIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    S: $ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4],
    value: S,
  ): C;
  declare export function setIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>>,
    S: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>, K5>,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4, K5],
    value: S,
  ): C;

  declare export function updateIn<C, S>(collection: C, keyPath: [], notSetValue: mixed, updater: (value: C) => S): S;
  declare export function updateIn<C, S>(collection: C, keyPath: [], updater: (value: C) => S): S;
  declare export function updateIn<C, K: $KeyOf<C>, S: $ValOf<C, K>, NSV>(
    collection: C,
    keyPath: [K],
    notSetValue: NSV,
    updater: (value: $ValOf<C, K> | NSV) => S,
  ): C;
  declare export function updateIn<C, K: $KeyOf<C>, S: $ValOf<C, K>>(
    collection: C,
    keyPath: [K],
    updater: (value: $ValOf<C, K>) => S,
  ): C;
  declare export function updateIn<C, K: $KeyOf<C>, K2: $KeyOf<$ValOf<C, K>>, S: $ValOf<$ValOf<C, K>, K2>, NSV>(
    collection: C,
    keyPath: [K, K2],
    notSetValue: NSV,
    updater: (value: $ValOf<$ValOf<C, K>, K2> | NSV) => S,
  ): C;
  declare export function updateIn<C, K: $KeyOf<C>, K2: $KeyOf<$ValOf<C, K>>, S: $ValOf<$ValOf<C, K>, K2>>(
    collection: C,
    keyPath: [K, K2],
    updater: (value: $ValOf<$ValOf<C, K>, K2>) => S,
  ): C;
  declare export function updateIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    S: $ValOf<$ValOf<$ValOf<C, K>, K2>, K3>,
    NSV,
  >(
    collection: C,
    keyPath: [K, K2, K3],
    notSetValue: NSV,
    updater: (value: $ValOf<$ValOf<$ValOf<C, K>, K2>, K3> | NSV) => S,
  ): C;
  declare export function updateIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    S: $ValOf<$ValOf<$ValOf<C, K>, K2>, K3>,
  >(
    collection: C,
    keyPath: [K, K2, K3],
    updater: (value: $ValOf<$ValOf<$ValOf<C, K>, K2>, K3>) => S,
  ): C;
  declare export function updateIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    S: $ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>,
    NSV,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4],
    notSetValue: NSV,
    updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4> | NSV) => S,
  ): C;
  declare export function updateIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    S: $ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4],
    updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>) => S,
  ): C;
  declare export function updateIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>>,
    S: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>, K5>,
    NSV,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4, K5],
    notSetValue: NSV,
    updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>, K5> | NSV) => S,
  ): C;
  declare export function updateIn<
    C,
    K: $KeyOf<C>,
    K2: $KeyOf<$ValOf<C, K>>,
    K3: $KeyOf<$ValOf<$ValOf<C, K>, K2>>,
    K4: $KeyOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>>,
    K5: $KeyOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>>,
    S: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>, K5>,
  >(
    collection: C,
    keyPath: [K, K2, K3, K4, K5],
    updater: (value: $ValOf<$ValOf<$ValOf<$ValOf<$ValOf<C, K>, K2>, K3>, K4>, K5>) => S,
  ): C;

  declare export function merge<C>(
    collection: C,
    ...collections: Array<$IterableOf<C> | $Shape<RecordValues<C>> | PlainObjInput<$KeyOf<C>, $ValOf<C>>>
  ): C;
  declare export function mergeWith<C>(
    merger: (oldVal: $ValOf<C>, newVal: $ValOf<C>, key: $KeyOf<C>) => $ValOf<C>,
    collection: C,
    ...collections: Array<$IterableOf<C> | $Shape<RecordValues<C>> | PlainObjInput<$KeyOf<C>, $ValOf<C>>>
  ): C;
  declare export function mergeDeep<C>(
    collection: C,
    ...collections: Array<$IterableOf<C> | $Shape<RecordValues<C>> | PlainObjInput<$KeyOf<C>, $ValOf<C>>>
  ): C;
  declare export function mergeDeepWith<C>(
    merger: (oldVal: any, newVal: any, key: any) => mixed,
    collection: C,
    ...collections: Array<$IterableOf<C> | $Shape<RecordValues<C>> | PlainObjInput<$KeyOf<C>, $ValOf<C>>>
  ): C;

  // declare export type KeyedCollection;
  // declare export type IndexedCollection;
  // declare export type SetCollection;
  // declare export type KeyedSeq;
  // declare export type IndexedSeq;
  // declare export type SetSeq;
  declare export var Iterable: any;
}
