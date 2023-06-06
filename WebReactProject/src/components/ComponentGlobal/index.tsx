import * as React from 'react';

import { L } from '../../lib/abpUtility';

class ComponentBase<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
  L(key: string, sourceName?: string): string {
    return L(key);
  }
}

export default ComponentBase;
