import { Map } from 'immutable'
import { Action } from 'redux'

import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ImmutableList, ImmutableMap } from '../utils/immutable'

import {
  APP,
  FIELDS
} from '../redux/selector-consts'

interface ActionPayload<T> {
  payload: T;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReduxAction<T = any> = Action<string> & ActionPayload<T>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReduxState = Map<string, any>

export type NullableState = ReduxState | undefined

export interface AppState {
  [APP]: NullableState;
  [FIELDS]: NullableState;
}

export type GetState = () => ReduxState

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PromiseAction = Action<Promise<any> | any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldsAction = ThunkAction<Promise<any>, ReduxState, any, PromiseAction | ReduxAction>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dispatch = ThunkDispatch<ReduxState, any, PromiseAction | ReduxAction>

export interface Debounce {
  meta: {
    debounce: {
      time: number;
      leading: boolean;
      trailing: boolean;
    };
  };
}

export type DebouncedFieldAction = FieldsAction & Debounce

export interface TDangerHTML {
  __html: string;
}

export interface NavLink {
  link: string;
  text: string;
  title: string;
  Icon: React.FunctionComponent;
}

export type TVerticalPosition = 'top' | 'middle' | 'bottom'

export interface TClassName { className: string }

export type OnOff = 'on' | 'off'

export interface ComboboxItem {
  id: string;
  name: string;
}

export type TImmutablePaths = ImmutableList<string>

export interface BreakPoint {
  path: string;
  blur?: string;
  type: string;
  media: string;
  width: number;
  height: number;
}

export type TImmutableBreakPoint = ImmutableMap<BreakPoint>

export type TImmutableBreakpoints = ImmutableList<TImmutableBreakPoint>

export interface TImage {
  src: string;
  alt: string;
  breakpoints: TImmutableBreakpoints;
}

export type TImmutableImage = ImmutableMap<TImage>

export type TImmutableImages = ImmutableList<TImmutableImage>

export type TImmutableIds = ImmutableList<string>

export type TImmutableSlugs = Map<string, string>

export interface FieldLoading {
  isFetching: boolean;
  errorMessage: string;
}

export type TImmutableLoading = ImmutableMap<FieldLoading>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableLoading (field: Map<string, any>): field is TImmutableLoading {
  return field.has('isFetching')
}

export interface FieldInput {
  path: TImmutablePaths;
  required?: boolean;
  invalid: boolean;
  valid: boolean;
  value: string;
}

export type TImmutableInput = ImmutableMap<FieldInput>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableInput (field: Map<string, any>): field is TImmutableInput {
  return typeof field.get('value') === 'string'
}

export interface FieldPassword {
  path: TImmutablePaths;
  value: string;
  valid: boolean;
  invalid: boolean;
  passLength: boolean;
  capital: boolean;
  digit: boolean;
  lowercase: boolean;
}

export type TImmutablePassword = ImmutableMap<FieldPassword>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutablePassword (field: Map<string, any>): field is TImmutablePassword {
  return field.has('passLength')
}

export interface FieldNumber {
  path: TImmutablePaths;
  invalid: boolean;
  valid: boolean;
  value: number;
  min?: number;
  max?: number;
}

export type TImmutableNumber = ImmutableMap<FieldNumber>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableNumber (field: Map<string, any>): field is TImmutableNumber {
  return typeof field.get('value') === 'number'
}

export interface FieldCombobox {
  path: TImmutablePaths;
  id: string;
  invalid: boolean;
  valid: boolean;
  value: string;
}

export type TImmutableCombobox = ImmutableMap<FieldCombobox>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableCombobox (field: Map<string, any>): field is TImmutableCombobox {
  return field.has('id')
}

export interface FieldSearch {
  path: TImmutablePaths;
  loading: boolean;
  search: string;
  invalid: boolean;
  valid: boolean;
  value: string;
}

export type TImmutableSearch = ImmutableMap<FieldSearch>

export interface FieldToggle {
  path: TImmutablePaths;
  value: boolean;
}

export type TImmutableToggle = ImmutableMap<FieldToggle>

export interface FieldCheckbox {
  path: TImmutablePaths;
  required?: boolean;
  checked: boolean;
  invalid: boolean;
  valid: boolean;
}

export type TImmutableCheckbox = ImmutableMap<FieldCheckbox>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableCheckbox (field: Map<string, any>): field is TImmutableCheckbox {
  return field.has('checked')
}

export interface FieldList {
  path: TImmutablePaths;
  list: TImmutableIds;
}

export type TImmutableList = ImmutableMap<FieldList>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableList (field: Map<string, any>): field is TImmutableList {
  return field.has('list')
}

export interface FieldPaginableList extends FieldList {
  past: number;
  pageSize: number;
}

export type TImmutablePaginableList = ImmutableMap<FieldPaginableList>

export interface FieldTemplateList<T> {
  path: TImmutablePaths;
  list: ImmutableList<T>;
  template: T;
}

export type TImmutableTemplateList<T> = ImmutableMap<FieldTemplateList<T>>

export interface FieldMap<T> {
  path: TImmutablePaths;
  map: T;
}

export type TImmutableFieldMap<T> = ImmutableMap<FieldMap<T>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableFieldMap (field: Map<string, any>): field is TImmutableFieldMap<any> {
  return field.has('map')
}

export type TImmutableQuarters = ImmutableList<string>

export interface SiteDocument {
  id: string;
  src: string;
  name: string;
  type: string;
  size: number;
  date: number;
}

export type TImmutableDocument = ImmutableMap<SiteDocument>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImmutableDocument (field: Map<string, any>): field is TImmutableDocument {
  return field.has('src')
}

export type TImmutableDocuments = Map<string, TImmutableDocument>
