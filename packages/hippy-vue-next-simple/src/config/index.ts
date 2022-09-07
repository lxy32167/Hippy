/**
 * Global style store identifier name
 *
 * @public
 */
const HIPPY_GLOBAL_STYLE_NAME = '__HIPPY_VUE_STYLES__';

/**
 * The name of the global to-be-removed style store identifier
 * When using hot update, expired styles will be added to the global dispose style
 *
 * @public
 */
const HIPPY_GLOBAL_DISPOSE_STYLE_NAME = '__HIPPY_VUE_DISPOSE_STYLES__';

/**
 * @public
 */
interface CommonMapParams {
  [key: string]: any;
}

export {
  HIPPY_GLOBAL_STYLE_NAME,
  HIPPY_GLOBAL_DISPOSE_STYLE_NAME,
  CommonMapParams,
};
