export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  files?: {
    name: string;
    url: string;
  }[];
  customContent?: React.ReactNode;
}
