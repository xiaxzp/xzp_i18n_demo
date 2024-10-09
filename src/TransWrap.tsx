import type { ReactNode } from 'react';
import { Trans } from 'react-i18next';

/*
re-pack for Trans
only allow deep 1 level component

previous: <Trans
  i18nKey={'complete in {time}'}
  components={{ st: <span className='text-primary-6' /> }}
  values={{ time: `<st>${diffTime}</st>` }}
/>

now: <TransAIO
  i18nKey={'complete in {time}'}
  components={{ time: <span className='text-primary-6'>{diffTime}</span> }}
/>
*/

type IProps = Exclude<Parameters<typeof Trans>[0], 'value' | 'components'> & {
  num?: number;
  components: { readonly [tagName: string]: React.ReactElement };
}

export default function TransWrap(props: IProps) {
  const { num, components, ...rest } = props;
  const values: Record<string, any> = {};
  const transComponents: { [tagName: string]: React.ReactElement } = {};
  if (num !== undefined) {
    // 传入0的场景
    values.num = num <= 1 ? 1 : num;
  }
  Object.keys(components).forEach((key) => {
    const comp = components[key];
    const compKey = `${key}_trans`;
    if (comp && typeof comp === 'object' && 'props' in comp && comp?.props?.children !== undefined) {
      values[key] = `<${compKey}>${comp.props.children}</${compKey}>`;
      transComponents[compKey] = comp;
    } else if (typeof comp !== 'object') {
      values[key] = comp;
    } else {
      values[key] = `<${compKey}></${compKey}>`;
      transComponents[compKey] = comp;
    }
  });
  // console.log(transComponents, values);

  return <Trans {...rest} components={transComponents} values={values} />;
}
