import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2D] via-[#123363] to-[#0D8B7D]">
      <Header />
      <div className="container mx-auto px-4 pt-16 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-6">
              AgilFlow - Politique de Confidentialité
            </h1>
            <div className="text-white space-y-4">
              <section>
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p>
                  La présente Politique de Confidentialité explique comment
                  AgilFlow collecte, utilise et protège vos données personnelles
                  lorsque vous utilisez nos services. Nous nous engageons à
                  respecter votre vie privée et à traiter vos données en
                  conformité avec le Règlement Général sur la Protection des
                  Données (RGPD).
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">2. Données Collectées</h2>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Données fournies par l'utilisateur</strong> : Nom,
                    prénom, adresse e-mail.
                  </li>
                  <li>
                    <strong>
                      Données générées par l’utilisation de la plateforme
                    </strong>
                    : Contenus partagés, interactions avec le service.
                  </li>
                  <li>
                    <strong>Données techniques</strong> : Adresse IP, type de
                    navigateur, informations de connexion.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">3. Finalité de la Collecte des Données</h2>
                <ul className="list-disc pl-5">
                  <li>Répondre à vos demandes et assurer le support client.</li>
                  <li>
                    Améliorer l’expérience utilisateur et optimiser nos services.
                  </li>
                  <li>Réaliser des analyses statistiques.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">4. Partage des Données</h2>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Hébergeur (IONOS)</strong> : Pour assurer la
                    disponibilité technique du site.
                  </li>
                  <li>
                    <strong>Autorités légales</strong> : En cas de réquisition
                    par les autorités compétentes.
                  </li>
                  <li>
                    <strong>Aucun partage commercial</strong> : Vos données ne
                    seront ni vendues, ni cédées à des tiers à des fins
                    publicitaires.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">5. Vos Droits</h2>
                <p>
                  Vous disposez des droits suivants sur vos données personnelles
                  :
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    Droit d’accès, de rectification, d’effacement et
                    d’opposition.
                  </li>
                  <li>
                    Droit à la limitation du traitement et à la portabilité des
                    données.
                  </li>
                </ul>
                <p>
                  Pour exercer vos droits, contactez-nous à :{' '}
                  <a
                    href="mailto:contact@agilflow.app"
                    className="text-blue-400 underline"
                  >
                    contact@agilflow.app
                  </a>{' '}
                  ou à l’adresse postale suivante :{' '}
                  <strong>
                    47 rue de la République, 83170 BRIGNOLES
                  </strong>
                  .
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">6. Cookies et Suivi</h2>
                <ul className="list-disc pl-5">
                  <li>
                    Nous utilisons uniquement des <strong>cookies nécessaires</strong> au
                    bon fonctionnement du site et des{' '}
                    <strong>cookies analytiques</strong> pour améliorer
                    l’expérience utilisateur.
                  </li>
                  <li>
                    Certains <strong>cookies tiers</strong> (ex : Webkit
                    Facebook) peuvent être déposés indépendamment de notre
                    volonté.
                  </li>
                  <li>
                    Une <strong>bannière de consentement</strong> s’affiche lors
                    de votre première visite pour vous permettre de gérer vos
                    préférences.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">7. Sécurité des Données</h2>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Certificat SSL (SHA256)</strong> pour sécuriser les
                    connexions.
                  </li>
                  <li>
                    <strong>Sauvegardes hebdomadaires</strong> des données.
                  </li>
                  <li>
                    <strong>Hashage des mots de passe avec bcrypt + salt</strong>{' '}
                    pour garantir leur sécurité.
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  8. Modifications de la Politique de Confidentialité
                </h2>
                <p>
                  Cette politique peut être mise à jour à tout moment. Nous vous
                  informerons des changements importants via notre site web.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">9. Contact</h2>
                <p>
                  Si vous avez des questions, vous pouvez nous contacter à :
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Email</strong> :{' '}
                    <a
                      href="mailto:contact@agilflow.app"
                      className="text-blue-400 underline"
                    >
                      contact@agilflow.app
                    </a>
                  </li>
                  <li>
                    <strong>Adresse postale</strong> : 47 rue de la République,
                    83170 BRIGNOLES
                  </li>
                </ul>
              </section>
              <p className="text-gray-300 mt-4">
                *Cette Politique de Confidentialité est en vigueur à compter du
                [date à compléter].*
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}