import { create } from 'zustand';

type FileType = 'text' | 'process' | 'json' | 'comm';

interface FileNode {
    id: string;
    name: string;
    type: FileType;
    path: string;
}

interface SystemState {
    currentPath: string;
    activeFile: FileNode | null;
    files: FileNode[];
    isCmdPaletteOpen: boolean;

    // Actions
    cd: (path: string) => void;
    openFile: (fileId: string) => void;
    toggleCmdPalette: () => void;
    setCmdPalette: (open: boolean) => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
    currentPath: '~/system',
    activeFile: null,
    isCmdPaletteOpen: false,
    files: [
        { id: '1', name: 'README.md', type: 'text', path: '~/system/README.md' },
        { id: '2', name: 'projects.exe', type: 'process', path: '~/user_space/projects.exe' },
        { id: '3', name: 'config.json', type: 'json', path: '~/system/config.json' },
        { id: '4', name: 'connect.sh', type: 'comm', path: '~/network/connect.sh' },
    ],

    cd: (path) => set({ currentPath: path }),

    openFile: (fileId) => {
        const file = get().files.find(f => f.id === fileId);
        if (file) set({ activeFile: file, currentPath: file.path, isCmdPaletteOpen: false });
    },

    toggleCmdPalette: () => set((state) => ({ isCmdPaletteOpen: !state.isCmdPaletteOpen })),
    setCmdPalette: (open) => set({ isCmdPaletteOpen: open }),
}));