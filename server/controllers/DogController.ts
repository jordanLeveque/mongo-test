import dogModel from '../models/dogModel';
import BaseController from './BaseController';

export default class DogController extends BaseController {
  model = dogModel;
}
