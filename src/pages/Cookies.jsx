import LegalDocument from '../components/LegalDocument'
import { cookiePolicy } from '../data/legal'

export default function Cookies() {
  return <LegalDocument document={cookiePolicy} path="/politica-de-cookies" />
}
