import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  arrayUnpack (data) {
    if (Array.isArray(data.data) && Array.isArray(data.fields)) {
      return data.data.map((m) => {
        const obj = {};
        data.fields.forEach((f, index) => { obj[f] = m[index] });
        return obj;
      });
    } else {
      return data;
    }
  };

  normalize(data) {
    const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';
    const isArray = (data) => Object.prototype.toString.call(data) === '[object Array]';

    const flatten = (data) => {
      if (!data.attributes) {
        return data
      }
      return {
        id: data.id,
        __popped: 'attributes',
        ...data.attributes
      };
    }

    if (isArray(data)) {
      return data.map((item) => this.normalize(item));
    }

    if (isObject(data)) {
      if (isArray(data.data)) {
        data = [...data.data];
      } else if (isObject(data.data)) {
        data = flatten({ __popped: 'data', ...data.data });
      } else if (data.data === null) {
        data = null
      } else {
        data = flatten(data);
      }

      for (const key in data) {
        data[key] = this.normalize(data[key]);
      }

      return data;
    }

    return data;
  }

  deepCopy<T>(target: T): T {
    const inst = this;
    if (target === null) {
      return target;
    }
    if (target instanceof Date) {
      return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
      const cp = [] as any[];
      (target as any[]).forEach((v) => { cp.push(v); });
      return cp.map((n: any) => inst.deepCopy<any>(n)) as any;
    }
    if (typeof target === 'object' && target !== null) {
      const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
      Object.keys(cp).forEach(k => {
        cp[k] = inst.deepCopy<any>(cp[k]);
      });
      return cp as T;
    }
    return target;
  };
}
