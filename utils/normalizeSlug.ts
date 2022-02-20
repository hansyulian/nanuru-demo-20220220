const restrictedCharacters = ['?', '!', '"', "'", '/', '#', '+']

export function normalizeSlug(value: string): string {
  let result = value;
  for (const restrictedCharacter of restrictedCharacters) {
    result = result.replaceAll(restrictedCharacter, '');
  }
  result = value.replaceAll(' ', '-').toLowerCase();
  return result;
}