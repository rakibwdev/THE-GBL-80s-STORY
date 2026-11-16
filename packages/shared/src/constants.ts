/**
 * Domain constants shared by client and server.
 * Single source of truth — never duplicate these strings.
 */

export const USER_ROLES = ['ADMIN', 'CONTRIBUTOR'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const SUBMISSION_STATUSES = [
  'DRAFT',
  'PENDING_REVIEW',
  'UNDER_REVIEW',
  'CHANGES_REQUESTED',
  'APPROVED',
  'REJECTED',
  'WITHDRAWN',
] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export const NOMINATION_STATUSES = [
  'PENDING',
  'UNDER_REVIEW',
  'CHANGES_REQUESTED',
  'APPROVED',
  'REJECTED',
] as const;
export type NominationStatus = (typeof NOMINATION_STATUSES)[number];

export const CONTENT_TYPES = [
  'PHOTOGRAPH',
  'NEWSPAPER_CLIPPING',
  'PROGRAMME',
  'SCORECARD',
  'MEMORABILIA',
  'DOCUMENT',
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

/** Historical dates are frequently unknown — this is a first-class concept. */
export const DATE_PRECISIONS = ['EXACT', 'YEAR', 'RANGE', 'UNKNOWN'] as const;
export type DatePrecision = (typeof DATE_PRECISIONS)[number];

export const RECOGNITION_CATEGORY_SLUGS = ['remarkables', 'legends', 'tributes'] as const;
export type RecognitionCategorySlug = (typeof RECOGNITION_CATEGORY_SLUGS)[number];

export const ARCHIVE_ITEM_STATUSES = ['DRAFT', 'PUBLISHED', 'UNPUBLISHED'] as const;
export type ArchiveItemStatus = (typeof ARCHIVE_ITEM_STATUSES)[number];

export const NEWS_STATUSES = ['DRAFT', 'PUBLISHED'] as const;
export type NewsStatus = (typeof NEWS_STATUSES)[number];

export const NEWS_TYPES = [
  'REUNION',
  'ANNOUNCEMENT',
  'COMMUNITY',
  'HISTORICAL_REUNION_RECORD',
] as const;
export type NewsType = (typeof NEWS_TYPES)[number];

export const MEDIA_KINDS = ['IMAGE', 'PDF'] as const;
export type MediaKind = (typeof MEDIA_KINDS)[number];

/** Upload constraints (enforced by Multer on the server, mirrored in form validation). */
export const UPLOAD_LIMITS = {
  maxFileSizeMb: 10,
  maxFilesPerSubmission: 10,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.pdf'],
} as const;
