const importedImages = import.meta.glob('../../imports/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const filenameToUrl = Object.fromEntries(
  Object.entries(importedImages).map(([path, url]) => {
    const filename = path.split('/').pop() ?? path;
    return [filename, url];
  })
) as Record<string, string>;

const basenameToFilename = Object.fromEntries(
  Object.keys(filenameToUrl).map((filename) => [
    filename.replace(/\.png$/i, ''),
    filename,
  ])
) as Record<string, string>;

const isHashPng = (filename: string) => /^[0-9a-f]{32}\.png$/i.test(filename);

export const fallbackImageFilename =
  Object.keys(filenameToUrl).filter(isHashPng).sort()[0] ??
  Object.keys(filenameToUrl).sort()[0] ??
  '';

export const allImportedImageFilenames = Object.keys(filenameToUrl).sort();

export type PersonaImageFilenameMap = Record<string, string>;

export const personaIdToImageFilename: PersonaImageFilenameMap = {
  m1: fallbackImageFilename,
  m2: fallbackImageFilename,
  m3: fallbackImageFilename,
  m4: fallbackImageFilename,
  m5: fallbackImageFilename,
  m6: fallbackImageFilename,
  m7: basenameToFilename['五分钟改变人生者'] ?? fallbackImageFilename,
  m8: basenameToFilename['闹钟逃亡者'] ?? fallbackImageFilename,
  a1: basenameToFilename['工位灵魂出窍者'] ?? fallbackImageFilename,
  a2: basenameToFilename['电子榨菜狂炫者'] ?? fallbackImageFilename,
  a3: basenameToFilename['精神下班者'] ?? fallbackImageFilename,
  a4: basenameToFilename['午后麻木者'] ?? fallbackImageFilename,
  a5: basenameToFilename['摸鱼行为艺术家'] ?? fallbackImageFilename,
  a6: basenameToFilename['人类电量1%者'] ?? fallbackImageFilename,
  a7: basenameToFilename['已读人生但不想回复者'] ?? fallbackImageFilename,
  a8: basenameToFilename['多巴胺急救模式'] ?? fallbackImageFilename,
  e1: basenameToFilename['白天装正常的人'] ?? fallbackImageFilename,
  e2: basenameToFilename['兴趣续命玩家'] ?? fallbackImageFilename,
  e3: basenameToFilename['今天辛苦了老板者'] ?? fallbackImageFilename,
  e4: basenameToFilename['夜间人格上线'] ?? fallbackImageFilename,
  e5: basenameToFilename['情绪散热中'] ?? fallbackImageFilename,
  e6: basenameToFilename['互联网夜游神'] ?? fallbackImageFilename,
  e7: basenameToFilename['白天那个不是我'] ?? fallbackImageFilename,
  e8: basenameToFilename['奖励自己综合征'] ?? fallbackImageFilename,
  n1: basenameToFilename['emo潜水艇'] ?? fallbackImageFilename,
  n2: basenameToFilename['赛博陪睡需求者'] ?? fallbackImageFilename,
  n3: basenameToFilename['凌晨突然想通人生'] ?? fallbackImageFilename,
  n4: basenameToFilename['舍不得睡星人'] ?? fallbackImageFilename,
  n5: basenameToFilename['回忆无限重播'] ?? fallbackImageFilename,
  n6: basenameToFilename['世界静音观察员'] ?? fallbackImageFilename,
  n7: basenameToFilename['凌晨两点互联网遗民'] ?? fallbackImageFilename,
  n8: basenameToFilename['全世界请小声一点者'] ?? fallbackImageFilename,
};

export const personaIdToImageUrl = Object.fromEntries(
  Object.entries(personaIdToImageFilename).map(([personaId, filename]) => [
    personaId,
    filenameToUrl[filename] ?? filenameToUrl[fallbackImageFilename],
  ])
) as Record<string, string>;

export const titleToImageUrl = Object.fromEntries(
  Object.entries(basenameToFilename).map(([basename, filename]) => [
    basename,
    filenameToUrl[filename] ?? filenameToUrl[fallbackImageFilename],
  ])
) as Record<string, string>;

export const imageMap = titleToImageUrl;

export function getPersonaImageUrl(personaId: string) {
  return personaIdToImageUrl[personaId] ?? filenameToUrl[fallbackImageFilename];
}

export function getImageUrlByFilename(imageFilename: string) {
  return filenameToUrl[imageFilename] ?? filenameToUrl[fallbackImageFilename];
}
