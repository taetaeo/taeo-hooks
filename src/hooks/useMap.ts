import React from "react";

/**
 * Map 또는 키-값 쌍 배열을 나타내는 타입입니다.
 * @template K - 맵의 키의 타입입니다.
 * @template V - 맵의 값의 타입입니다.
 * @example const mapExample: MapOrEntries<string, number> = new Map([['one', 1], ['two', 2], ['three', 3],]);
 * 출력: Map { 'one' => 1, 'two' => 2, 'three' => 3 }
 * @example const mapExample2: MapOrEntries<string, number> = new Map();
 * mapExample2.set('hello', 5);
 * mapExample2.set('world', 8);
 * 출력: [ [ 'hello', 5 ], [ 'world', 8 ] ]
 */

export type MapOrEntries<K, V> = Map<K, V> | [K, V][];

/**
 * 맵 상태와 상호작용하기 위한 가능한 액션들을 나타냅니다.
 * @template K - 맵의 키의 타입입니다.
 * @template V - 맵의 값의 타입입니다.
 * @event set - 주어진 키와 값으로 새로운 항목을 맵에 추가하거나, 이미 있는 키의 값을 갱신합니다.
 * @param {K} key - 맵에 추가하거나 갱신할 항목의 키 입니다.
 * @param {V} value - 맵에 추가하거나 갱신할 항목의 값 입니다.
 * @returns {void} 반환값
 *
 * @event setAll - 주어진 맵이나 키-값 쌍의 배열로 맵 상태를 설정합니다.
 * @param {MapOrEntries} entries - 설정하고자 하는 맵이나 키-값 쌍의 배열입니다.
 * @returns {void} 반환값
 *
 * @event remove - 주어진 키에 해당하는 항목을 맵에서 제거합니다.
 * @param {K} key - 제거하고자 하는 항목의 키 값
 * @returns {void} 반환값
 *
 * @event reset - 맵 상태를 초기화하여 빈 맵으로 만듭니다. 이는 Map 객체의 clear 메서드를 사용합니다.
 * @returns {void} 반환값
 */

export interface Actions<K, V> {
  set: (key: K, value: V) => void;
  setAll: (entries: MapOrEntries<K, V>) => void;
  remove: (key: K) => void;
  reset: Map<K, V>["clear"];
}

/**
 * `useMap` 훅의 결과를 나타냅니다.
 * 반환된 맵에서 일부 세터(setters)를 숨겨 자동완성을 비활성화합니다.
 * "set", "clear", "delete" 메서드를 제외한 Map<K, V>의 타입을 의미합니다.
 * 따라서, 이 타입은 Map 객체에서  set, clear, delete 메서드를 제외한 타입입니다.
 * @template K - 맵의 키의 타입입니다.
 * @template V - 맵의 값의 타입입니다.
 */

type Return<K, V> = [Omit<Map<K, V>, "set" | "clear" | "delete">, Actions<K, V>];

/**
 * 이 훅은 키-값 맵 상태와 세터 액션을 관리하기 위한 커스텀 훅입니다.
 * @template K - 맵의 키의 타입입니다.
 * @template V - 맵의 값의 타입입니다.
 * @param {MapOrEntries<K, V>} [initialState] - 맵의 초기 상태로 Map 또는 키-값 쌍의 배열로 설정될 수 있습니다 (선택 사항).
 * @returns {Return<K, V>} - 맵 상태와 맵과 상호작용하기 위한 액션들을 포함하는 튜플을 반환합니다.
 * @see [Documentation](https://taeo.gitbook.io/taeo/taeo-hooks/usemap)
 * @example
 * const [map, mapActions] = useMap();
 * // `map` 상태에 접근하고, `mapActions`를 사용하여 항목을 설정하거나 제거하거나 초기화할 수 있습니다.
 */

export function useMap<K, V>(initialState: MapOrEntries<K, V> = new Map()): Return<K, V> {
  const [map, setMap] = React.useState(new Map(initialState));

  const actions: Actions<K, V> = {
    set: React.useCallback((key, value) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.set(key, value);
        return copy;
      });
    }, []),

    setAll: React.useCallback((entries) => {
      setMap(() => new Map(entries));
    }, []),

    remove: React.useCallback((key) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
    }, []),

    reset: React.useCallback(() => {
      setMap(() => new Map());
    }, []),
  };

  return [map, actions] as const;
}
