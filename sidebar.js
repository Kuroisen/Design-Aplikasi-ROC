// sidebar.js

// Fungsi global untuk membuka/menutup dropdown menu dan sub-menu
window.toggleMenu = function(menuId, arrowId) {
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(arrowId);
    if (menu && arrow) {
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
};

// Fungsi toggle sidebar untuk tampilan mobile
window.toggleMobileSidebar = function() {
    const sidebar = document.getElementById('sidebarTag');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }
};

/**
 * Menghitung prefix relatif ("" | "../" | "../../" | "../../../") menuju folder "design aplikasi"
 */
function getRootPrefix() {
    const cleanPath = decodeURIComponent(window.location.pathname)
        .replace(/\\/g, '/')
        .toLowerCase();

    const rootMarker = '/design aplikasi/';
    const markerIndex = cleanPath.indexOf(rootMarker);

    if (markerIndex !== -1) {
        const relativePart = cleanPath.slice(markerIndex + rootMarker.length);
        const segments = relativePart.split('/').filter(Boolean);
        const folderDepth = Math.max(0, segments.length - 1);
        return '../'.repeat(folderDepth);
    }

    // Fallback berdasarkan kedalaman folder umum
    if (
        cleanPath.includes('/parameter/periode/periode/') ||
        cleanPath.includes('/parameter/periode/tahun/') ||
        cleanPath.includes('/parameter/unit-organisasi/struktur-organisasi/') ||
        cleanPath.includes('/parameter/unit-organisasi/unit-kerja/') ||
        cleanPath.includes('/parameter/unit-organisasi/direktorat/') ||
        cleanPath.includes('/parameter/unit-organisasi/kantor-cabang/')
    ) {
        return '../../../';
    }
    if (
        cleanPath.includes('/library/indicator/') ||
        cleanPath.includes('/library/list dokumen/') ||
        cleanPath.includes('/library/list-dokumen/') ||
        cleanPath.includes('/library/regulasi/') ||
        cleanPath.includes('/parameter/bidang/') ||
        cleanPath.includes('/parameter/otoritas/') ||
        cleanPath.includes('/parameter/periode/') ||
        cleanPath.includes('/parameter/penilaian/') ||
        cleanPath.includes('/parameter/rating-penilaian/') ||
        cleanPath.includes('/parameter/severity-audit/') ||
        cleanPath.includes('/parameter/unit-organisasi/')
    ) {
        return '../../';
    }
    if (
        cleanPath.includes('/utility/user/')
    ) {
        return '../../';
    }
    if (
        cleanPath.includes('/library/') ||
        cleanPath.includes('/parameter/') ||
        cleanPath.includes('/utility/') ||
        cleanPath.includes('/self-assessment/') ||
        cleanPath.includes('/self-asssment/') ||
        cleanPath.includes('/review/')
    ) {
        return '../';
    }

    return '';
}

function renderSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const prefix = getRootPrefix();

    const links = {
        index: `${prefix}index.html`,
        selfAssessment: `${prefix}self-asssment/self-assessment.html`,
        review: `${prefix}review/review.html`,
        report: `${prefix}report.html`,

        // Library
        regulasi: `${prefix}library/regulasi/regulasi.html`,
        indicator: `${prefix}library/indicator/indicator.html`,
        listDokumen: `${prefix}library/list-dokumen/list-dokumen.html`,

        // Parameter -> Periode
        tahun: `${prefix}parameter/periode/tahun/periode-tahun.html`,
        periode: `${prefix}parameter/periode/periode/periode-periode.html`,

        // Parameter -> Unit Organisasi
        strukturOrganisasi: `${prefix}parameter/unit-organisasi/struktur-organisasi/struktur-organisasi.html`,
        unitKerja: `${prefix}parameter/unit-organisasi/unit-kerja/unit-kerja.html`,
        direktorat: `${prefix}parameter/unit-organisasi/direktorat/direktorat.html`,
        kantorCabang: `${prefix}parameter/unit-organisasi/kantor-cabang/kantor-cabang.html`,

        // Parameter lainnya
        penilaianAudit: `${prefix}parameter/penilaian/penilaian-audit.html`,
        ratingPenilaian: `${prefix}parameter/rating-penilaian/rating-penilaian.html`,
        severityAudit: `${prefix}parameter/severity-audit/severity-audit.html`,
        otoritas: `${prefix}parameter/otoritas/otoritas.html`,
        bidang: `${prefix}parameter/bidang/bidang.html`,

        // Utility
        user: `${prefix}utility/user/user.html`
    };

    const sidebarHTML = `
        <div id="sidebarOverlay" onclick="toggleMobileSidebar()" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 hidden md:hidden"></div>

        <aside id="sidebarTag" class="fixed md:static inset-y-0 left-0 z-40 w-72 h-screen bg-[#0b0f19] text-slate-300 flex flex-col justify-between border-r border-slate-800/80 transition-transform duration-300 -translate-x-full md:translate-x-0 shrink-0">
            <div class="flex-1 overflow-y-auto custom-scrollbar">
                <div class="h-16 flex items-center justify-between px-6 bg-[#080b12] border-b border-slate-800/80 sticky top-0 z-10">
                    <a href="${links.index}" class="flex items-center space-x-3 text-white font-bold text-lg tracking-wide">
                        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <i class="fa-solid fa-shield-halved text-white text-sm"></i>
                        </div>
                        <span>e-Compliance</span>
                    </a>
                    <button type="button" onclick="toggleMobileSidebar()" class="md:hidden text-slate-400 hover:text-white">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <nav class="p-4 space-y-1.5 text-sm">
                    <a href="${links.index}" id="menu-dashboard" class="nav-link flex items-center px-3.5 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition font-medium">
                        <i class="fa-solid fa-chart-pie w-5 mr-3 text-slate-400"></i>
                        <span>Dashboard</span>
                    </a>

                    <a href="${links.selfAssessment}" id="menu-self-assessment" class="nav-link flex items-center px-3.5 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition font-medium">
                        <i class="fa-solid fa-clipboard-check w-5 mr-3 text-slate-400"></i>
                        <span>Self-Assessment</span>
                    </a>

                    <a href="${links.review}" id="menu-review" class="nav-link flex items-center px-3.5 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition font-medium">
                        <i class="fa-solid fa-magnifying-glass-chart w-5 mr-3 text-slate-400"></i>
                        <span>Review</span>
                    </a>

                    <a href="${links.report}" id="menu-report" class="nav-link flex items-center px-3.5 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition font-medium">
                        <i class="fa-solid fa-file-lines w-5 mr-3 text-slate-400"></i>
                        <span>Report</span>
                    </a>

                    <div class="pt-3 pb-1 px-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Master & Konfigurasi
                    </div>

                    <!-- MENU: LIBRARY -->
                    <div class="space-y-1">
                        <button type="button" onclick="toggleMenu('menuLibrary', 'arrowLibrary')" id="btn-library" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition font-medium text-left">
                            <span class="flex items-center">
                                <i class="fa-solid fa-book-bookmark w-5 mr-3 text-blue-400"></i>
                                <span>Library</span>
                            </span>
                            <i id="arrowLibrary" class="fa-solid fa-chevron-down text-xs text-slate-500 transition-transform duration-200"></i>
                        </button>
                        
                        <div id="menuLibrary" class="hidden pl-4 space-y-1 border-l border-slate-800 ml-5 mt-1">
                            <a href="${links.regulasi}" id="menu-regulasi" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                Regulasi
                            </a>
                            <a href="${links.indicator}" id="menu-indicator" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                Indicator
                            </a>
                            <a href="${links.listDokumen}" id="menu-dokumen" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                List Dokumen
                            </a>
                        </div>
                    </div>

                    <!-- MENU: PARAMETER -->
                    <div class="space-y-1">
                        <button type="button" onclick="toggleMenu('menuParameter', 'arrowParameter')" id="btn-parameter" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition font-medium text-left">
                            <span class="flex items-center">
                                <i class="fa-solid fa-sliders w-5 mr-3 text-indigo-400"></i>
                                <span>Parameter</span>
                            </span>
                            <i id="arrowParameter" class="fa-solid fa-chevron-down text-xs text-slate-500 transition-transform duration-200"></i>
                        </button>

                        <div id="menuParameter" class="hidden pl-4 space-y-1 border-l border-slate-800 ml-5 mt-1">
                            <div class="space-y-1">
                                <button type="button" onclick="toggleMenu('subMenuPeriode', 'arrowPeriode')" id="btn-periode" class="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition text-left">
                                    <span>Periode</span>
                                    <i id="arrowPeriode" class="fa-solid fa-chevron-down text-[10px] text-slate-500 transition-transform duration-200"></i>
                                </button>
                                
                                <div id="subMenuPeriode" class="hidden pl-3 space-y-1 border-l border-slate-800/80 ml-2">
                                    <a href="${links.tahun}" id="menu-tahun" class="nav-link block py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                        Tahun
                                    </a>
                                    <a href="${links.periode}" id="menu-periode-item" class="nav-link block py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                        Periode
                                    </a>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <button type="button" onclick="toggleMenu('subMenuUnitOrg', 'arrowUnitOrg')" id="btn-unit-org" class="w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition text-left">
                                    <span>Unit Organisasi</span>
                                    <i id="arrowUnitOrg" class="fa-solid fa-chevron-down text-[10px] text-slate-500 transition-transform duration-200"></i>
                                </button>
                                
                                <div id="subMenuUnitOrg" class="hidden pl-3 space-y-1 border-l border-slate-800/80 ml-2">
                                    <a href="${links.strukturOrganisasi}" id="menu-struktur-org" class="nav-link block py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                        Struktur Organisasi
                                    </a>
                                    <a href="${links.unitKerja}" id="menu-unit-kerja" class="nav-link block py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                        Unit Kerja
                                    </a>
                                    <a href="${links.direktorat}" id="menu-direktorat" class="nav-link block py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                        Direktorat
                                    </a>
                                    <a href="${links.kantorCabang}" id="menu-kantor-cabang" class="nav-link block py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                        Kantor Cabang
                                    </a>
                                </div>
                            </div>

                            <a href="${links.penilaianAudit}" id="menu-penilaian-audit" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                Penilaian Audit
                            </a>
                            <a href="${links.ratingPenilaian}" id="menu-rating-penilaian" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                Rating Penilaian
                            </a>
                            <a href="${links.severityAudit}" id="menu-severity" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                Severity Audit
                            </a>
                            <a href="${links.otoritas}" id="menu-otoritas" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                Otoritas
                            </a>
                            <a href="${links.bidang}" id="menu-bidang" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                Bidang
                            </a>
                        </div>
                    </div>

                    <!-- MENU: UTILITY -->
                    <div class="space-y-1">
                        <button type="button" onclick="toggleMenu('menuUtility', 'arrowUtility')" id="btn-utility" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg hover:bg-slate-800/60 hover:text-white transition font-medium text-left">
                            <span class="flex items-center">
                                <i class="fa-solid fa-wrench w-5 mr-3 text-cyan-400"></i>
                                <span>Utility</span>
                            </span>
                            <i id="arrowUtility" class="fa-solid fa-chevron-down text-xs text-slate-500 transition-transform duration-200"></i>
                        </button>

                        <div id="menuUtility" class="hidden pl-4 space-y-1 border-l border-slate-800 ml-5 mt-1">
                            <a href="${links.user}" id="menu-user" class="nav-link block py-2 px-3 rounded-lg text-xs hover:bg-slate-800/50 hover:text-white transition">
                                User
                            </a>
                        </div>
                    </div>
                </nav>
            </div>

            <div class="p-4 bg-[#080b12] border-t border-slate-800/80 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-semibold text-xs">
                        AD
                    </div>
                    <div>
                        <p class="text-xs font-semibold text-white">Administrator</p>
                        <p class="text-[11px] text-slate-500">Compliance Team</p>
                    </div>
                </div>
                <button type="button" title="Logout" class="text-slate-400 hover:text-rose-400 transition p-1.5 rounded-lg hover:bg-slate-800/60">
                    <i class="fa-solid fa-right-from-bracket text-sm"></i>
                </button>
            </div>
        </aside>
    `;

    container.innerHTML = sidebarHTML;
    setActiveNavigation();
}

function setActiveNavigation() {
    const path = decodeURIComponent(window.location.pathname).replace(/\\/g, '/').toLowerCase();
    const activeClass = ['bg-blue-600/15', 'text-blue-400', 'font-semibold', 'border', 'border-blue-500/20'];

    const expandParent = (menuId, arrowId, btnId) => {
        const menu = document.getElementById(menuId);
        const arrow = document.getElementById(arrowId);
        const btn = document.getElementById(btnId);
        if (menu) menu.classList.remove('hidden');
        if (arrow) arrow.classList.add('rotate-180');
        if (btn) btn.classList.add('text-white', 'bg-slate-800/40');
    };

    const routes = [
        { file: 'index.html', id: 'menu-dashboard' },
        { file: 'self-assessment.html', id: 'menu-self-assessment' },
        { file: 'review.html', id: 'menu-review' },
        { file: 'report.html', id: 'menu-report' },

        { file: 'regulasi.html', id: 'menu-regulasi', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },
        { file: 'tambah-regulasi.html', id: 'menu-regulasi', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },

        { file: 'indicator.html', id: 'menu-indicator', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },
        { file: 'tambah-indicator.html', id: 'menu-indicator', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },

        { file: 'list-dokumen.html', id: 'menu-dokumen', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },
        { file: 'detail-indicator.html', id: 'menu-dokumen', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },
        { file: 'detail-komponen.html', id: 'menu-dokumen', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },
        { file: 'detail-sub-indicator.html', id: 'menu-dokumen', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },
        { file: 'dokumen-sub-indicator.html', id: 'menu-dokumen', parent: ['menuLibrary', 'arrowLibrary', 'btn-library'] },

        { file: 'periode-tahun.html', id: 'menu-tahun', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuPeriode', 'arrowPeriode', 'btn-periode'] },
        { file: 'tambah-periode-tahun.html', id: 'menu-tahun', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuPeriode', 'arrowPeriode', 'btn-periode'] },

        { file: 'periode-periode.html', id: 'menu-periode-item', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuPeriode', 'arrowPeriode', 'btn-periode'] },
        { file: 'tambah-periode.html', id: 'menu-periode-item', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuPeriode', 'arrowPeriode', 'btn-periode'] },

        { file: 'struktur-organisasi.html', id: 'menu-struktur-org', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },
        { file: 'tambah-unit.html', id: 'menu-struktur-org', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },

        { file: 'unit-kerja.html', id: 'menu-unit-kerja', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },
        { file: 'tambah-unit-kerja.html', id: 'menu-unit-kerja', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },

        { file: 'direktorat.html', id: 'menu-direktorat', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },
        { file: 'tambah-direktorat.html', id: 'menu-direktorat', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },

        { file: 'kantor-cabang.html', id: 'menu-kantor-cabang', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },
        { file: 'tambah-kantor-cabang.html', id: 'menu-kantor-cabang', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'], subParent: ['subMenuUnitOrg', 'arrowUnitOrg', 'btn-unit-org'] },

        { file: 'penilaian-audit.html', id: 'menu-penilaian-audit', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'rating-penilaian.html', id: 'menu-rating-penilaian', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'tambah-rating-penilaian.html', id: 'menu-rating-penilaian', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'severity-audit.html', id: 'menu-severity', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'tambah-severity-audit.html', id: 'menu-severity', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'otoritas.html', id: 'menu-otoritas', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'tambah-otoritas.html', id: 'menu-otoritas', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'bidang.html', id: 'menu-bidang', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },
        { file: 'tambah-bidang.html', id: 'menu-bidang', parent: ['menuParameter', 'arrowParameter', 'btn-parameter'] },

        { file: 'user.html', id: 'menu-user', parent: ['menuUtility', 'arrowUtility', 'btn-utility'] }
    ];

    for (const route of routes) {
        if (path.endsWith('/' + route.file) || path.endsWith(route.file)) {
            const el = document.getElementById(route.id);
            if (el) el.classList.add(...activeClass);
            if (route.parent) expandParent(...route.parent);
            if (route.subParent) expandParent(...route.subParent);
            break;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSidebar);
} else {
    renderSidebar();
}