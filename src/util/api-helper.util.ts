import { Request } from 'express';

/**
 * Helper method to build the full Location URI for the newly created resource.
 */
export function buildLocation(request: Request, id: number): string {
  return `${request.protocol}://${request.get('host')}${request.path}/${id}`;
}
